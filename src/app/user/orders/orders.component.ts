import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { User, Order, Product } from 'src/app/shared/interfaces';
import { OrdersService, AuthService, ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

interface _Product extends Product {
    count ? : number;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    constructor(private alertService: AlertService,
        private loaderService: LoaderService,
        private ordersService: OrdersService,
        private productsService: ProductsService,
        private auth: AuthService) {}

    user: User;
    loading = true;
    orders: Order[] = [];
    products: _Product[] = [];
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
            .subscribe((orders) => {
                this.orders = orders;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
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
                const tmp: _Product = item;
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
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
