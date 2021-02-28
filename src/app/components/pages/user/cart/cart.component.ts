import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ModuleWindowComponent } from 'src/app/components/templates';
import { CartItem, Product, User, Order, OrderStates, Contacts } from 'src/app/interfaces';
import { AuthService, CartService, ContactsService, OrdersService, ProductsService, UserService } from 'src/app/services';
import { AlertService } from 'src/app/services';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    animations: [
        trigger('appearDisappear', [
            transition(':leave', [
                animate('400ms linear', keyframes([
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)',
                        offset: 0
                    }),
                    style({
                        opacity: 0,
                        transform: 'translateX(-100%)',
                        offset: 1
                    }),
                ]))
            ]),
        ]),
    ],
})
export class CartComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private products$ = new Subject();

    constructor(private cdr: ChangeDetectorRef,
        private productsService: ProductsService,
        private cartService: CartService,
        private alertService: AlertService,
        private userService: UserService,
        private ordersService: OrdersService,
        private router: Router,
        private contactsService: ContactsService,
        private auth: AuthService) {}

    @ViewChild(ModuleWindowComponent)
    moduleWindow: ModuleWindowComponent;

    user: User;
    userId = 'anonymous';
    products: Product[] = [];
    searchString = '';
    cart: CartItem[] = [];
    sum = 0;
    saveCity = false;
    selectedCity: Contacts = null;
    contacts: Contacts[] = [];

    moduleForm = new FormGroup({
        phone: new FormControl(null, [
            Validators.required,
            Validators.pattern('[0-9]+')
        ]),
    });

    ngOnInit(): void {
        this.products$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                const data = this.cartService.get(this.userId);
                if (!data) {
                    this.cart = [];
                    this.products = [];
                    return;
                }
                this.cart = data;
                this.products = this.products
                    .filter(p =>
                        data.find(i => i.id === p._id))
                    .map(p => {
                        p.count =
                            data.find(i => i.id === p._id).count;
                        return p;
                    });
                this.countSum();
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        forkJoin([this.auth.getUser(), this.contactsService.getAll(), this.productsService.getAll()])
            .pipe(take(1))
            .subscribe(([user, contacts, products]) => {
                this.user = user;
                if (this.user) {
                    this.userId = this.user._id;
                }
                this.contacts = contacts;
                if (products.length) {
                    this.products = products;
                }
                this.products$.next();
                if (this.user && this.user.city) {
                    this.selectedCity = this.contacts.find(item => item._id === this.user.city);
                    if (!this.selectCity) {
                        this.selectedCity = contacts[0];
                    }
                }
                if (this.user && this.user.phone) {
                    this.moduleForm.patchValue({ phone: this.user.phone });
                }

                this.cdr.detectChanges();
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    removeProduct(pId: string): void {
        this.cartService.delete(this.userId, pId);
        this.products$.next();
    }

    countSum(): void {
        this.sum = 0;
        for (const item of this.products) {
            this.sum += item.cost * item.count;
        }
    }

    increase(p: Product): void {
        if (p.inStock >= p.count + 1) {
            p.count++;
            this.countSum();
        }
    }

    decrease(p: Product): void {
        if (p.count - 1 >= 0) {
            p.count--;
            this.countSum();
        }
    }

    save(p: Product): void {
        if (p.count > p.inStock) {
            p.count = p.inStock;
        }
        if (p.count <= 0) {
            p.count = 1;
        }
        this.cartService.set(this.userId, { id: p._id, count: p.count });
        this.countSum();
    }

    getFullInformation(id: string): void {
        this.router.navigateByUrl(`products/${id}/description`);
    }

    isCatalogScrollable(): boolean {
        return this.products.length * 100 > document.documentElement.clientHeight - 239;
    }

    selectCity(item: Contacts): void {
        this.selectedCity = item;
    }

    makeOrder(): void {
        if (!this.products.length || this.moduleForm.invalid) {
            return;
        }

        if (this.saveCity && this.user) {
            this.user.city = this.selectedCity._id;
        }

        if (this.user && this.user.phone) {
            this.user.phone = this.moduleForm.getRawValue().phone;
            this.userService.update(this.user._id, this.user).subscribe();
        }

        const order: Order = {
            userId: (this.user ? this.userId : null),
            date: new Date(),
            userGeo: this.selectedCity._id,
            state: OrderStates.NEW,
            products: this.cart,
        };

        if (!this.user) {
            order.userPhone = this.moduleForm.getRawValue().phone;
        }

        this.ordersService.create(order).subscribe(() => {
            this.alertService.fire('Success', 'Your order has been successfully sent.', false);
            this.moduleForm.reset();
            this.moduleWindow.close();
            this.cartService.clear(this.userId);
            this.products$.next();
        }, () => {
            this.alertService.fire('Error', 'Something went wrong.', false);
        });
    }
}
