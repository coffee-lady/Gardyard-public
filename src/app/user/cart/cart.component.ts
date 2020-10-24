import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, merge, Subject } from 'rxjs';
import { takeUntil, take, mergeMap } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { ModuleWindowComponent } from 'src/app/module-window/module-window.component';
import { CartItem, Plant, Product, User, Order, States, Contacts } from 'src/app/shared/interfaces';
import { AuthService, CartService, ContactsService, OrdersService, ProductsService, UserService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

// tslint:disable-next-line: class-name
interface _Product extends Product {
    count ? : number;
}

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
        private loaderService: LoaderService,
        private userService: UserService,
        private ordersService: OrdersService,
        private router: Router,
        private contactsService: ContactsService,
        private auth: AuthService) {}

    @ViewChild(ModuleWindowComponent)
    moduleWindow: ModuleWindowComponent;

    user: User;
    loading = true;
    products: _Product[] = [];
    searchString = '';
    cart: CartItem[];
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
        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });

        forkJoin([this.auth.getUser(), this.contactsService.getAll(), this.productsService.getAll()])
            .pipe(take(1))
            .subscribe(([user, contacts, products]) => {
                this.user = user;
                this.contacts = contacts;
                if (products.length) {
                    this.products = products;
                }
                this.products$.next();
                if (this.user.city) {
                    this.selectedCity = this.contacts.find(item => item._id === this.user.city);
                }
                if (this.user.phone) {
                    this.moduleForm.patchValue({ phone: this.user.phone });
                }
                this.cdr.detectChanges();
                return this.products$;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        this.products$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.cart = this.cartService.get(this.user._id);
                if (!this.cart) {
                    this.cart = [];
                }
                const data = this.cart;
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
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    removeProduct(id: string): void {
        this.cartService.delete(this.user._id, id);
        this.products$.next();
    }

    countSum(): void {
        this.sum = 0;
        for (const item of this.products) {
            this.sum += item.cost * item.count;
        }
    }

    increase(p: _Product): void {
        if (p.inStock >= p.count + 1) {
            p.count++;
            this.countSum();
        }
    }

    decrease(p: _Product): void {
        if (p.count - 1 >= 0) {
            p.count--;
            this.countSum();
        }
    }

    save(p: _Product): void {
        if (p.count > p.inStock) {
            p.count = p.inStock;
        }
        if (p.count <= 0) {
            p.count = 1;
        }
        this.cartService.set(this.user._id, { id: p._id, count: p.count });
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

        if (this.saveCity) {
            this.user.city = this.selectedCity._id;
        }

        this.user.phone = this.moduleForm.getRawValue().phone;
        this.userService.update(this.user._id, this.user).subscribe();

        const order: Order = {
            userId: this.user._id,
            date: new Date(),
            geo: this.selectedCity._id,
            state: States.NEW,
            products: this.cart,
        };

        this.ordersService.create(order).subscribe(() => {
            this.alertService.fire('Success', 'Your order has been successfully sent.', false);
            this.moduleForm.reset();
            this.moduleWindow.close();
            this.cartService.clear(this.user._id);
            this.products$.next();
        }, () => {
            this.alertService.fire('Error', 'Something went wrong.', false);
        });
    }
}
