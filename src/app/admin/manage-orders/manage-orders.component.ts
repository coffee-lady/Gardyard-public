import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Product, User, Order, States } from 'src/app/shared/interfaces';
import { OrdersService, ProductsService, AuthService, UserService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

interface _Product extends Product {
    count ? : number;
}

@Component({
    selector: 'app-manage-orders',
    templateUrl: './manage-orders.component.html',
    styleUrls: ['./manage-orders.component.scss'],
    animations: [
        trigger('appear', [
            transition(':enter', [
                animate('300ms ease-in', keyframes([
                    style({
                        opacity: 0,
                        transform: 'translateY(100%)',
                        offset: 0
                    }),
                    style({
                        opacity: 1,
                        transform: 'translateY(0%)',
                        offset: 1
                    }),
                ]))
            ]),
        ]),
    ],
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    constructor(private alertService: AlertService,
        private loaderService: LoaderService,
        private ordersService: OrdersService,
        private productsService: ProductsService,
        private userService: UserService,
        private auth: AuthService) {}

    user: User;
    loading = true;
    orders: Order[] = [];
    products: _Product[] = [];
    allProducts: Product[] = [];
    selected: Order | null = null;
    cost = 0;
    count = 0;
    testData = [{ title: 'Liverpool', id: '1' },
        { title: 'Paris', id: '2' },
        { title: 'Beijing', id: '3' },
    ];
    filter = '';

    ngOnInit(): void {

        this.ordersService.getAll()
            .pipe(takeUntil(this.unsubscribe$))
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
        if (!this.selected || this.selected && this.selected.userId !== order.userId) {
            this.userService.get(order.userId)
                .pipe(take(1))
                .subscribe(user => this.user = user);
        }
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

    setState(state: number): void {
        this.selected.state = state;
        this.ordersService.update(this.selected._id, this.selected).subscribe();
    }

    setFilter(event: Event): void {
        const elem = event.target as HTMLElement;
        this.filter = elem.dataset.filter;
        document.querySelector('.active').classList.remove('active');
        elem.classList.add('active');
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
