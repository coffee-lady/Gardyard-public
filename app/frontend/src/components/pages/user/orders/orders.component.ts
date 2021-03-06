import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { User, Order, Product } from 'app/frontend/src/interfaces';
import { OrdersService, AuthService, ProductsService } from 'app/frontend/src/services';
import { AlertService } from 'app/frontend/src/services';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    constructor(private alertService: AlertService,
        private ordersService: OrdersService,
        private productsService: ProductsService,
        private auth: AuthService) {}

    user: User;
    orders: Order[] = [];
    products: Product[] = [];
    allProducts: Product[] = [];
    selected: Order | null = null;
    cost = 0;
    count = 0;

    ngOnInit(): void {
        this.auth.getUser()
            .pipe(mergeMap(user => {
                this.user = user;
                return this.ordersService.getAllOfUser(user._id);
            }))
            .subscribe((orders: Order[]) => {
                this.orders = orders;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        this.productsService
            .getAll()
            .pipe(take(1))
            .subscribe((products) => {
                this.allProducts = products;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    select(order: Order): void {
        this.products = [];
        this.cost = 0;
        this.count = 0;
        this.selected = order;
        for (const item of this.allProducts) {
            const found = this.selected.products.find(x => item._id === x.id);
            if (found) {
                const tmp: Product = item;
                tmp.count = found.count;
                this.products.push(tmp);
                this.cost += tmp.count * tmp.cost;
                this.count += tmp.count;
            }
        }
    }

    estimate(num: number): void {
        this.selected.rate = num;
        this.ordersService.update(this.selected._id, this.selected).subscribe();
        for (const x of this.products) {
            x.rates.push(num);
            this.productsService.update(x._id, x).subscribe();
        }
        this.selected.state = 3;
        this.ordersService.update(this.selected._id, this.selected).subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
