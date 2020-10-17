import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take, mergeMap } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { CartItem, Plant, Product, User } from 'src/app/shared/interfaces';
import { AuthService, CartService, ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

// tslint:disable-next-line: class-name
interface _Product extends Product {
    count ? : number;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    user: User;
    loading = true;
    products: _Product[] = [];
    searchString = '';
    cart: CartItem[];
    sum = 0;

    constructor(private productsService: ProductsService,
        private cartService: CartService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router,
        private auth: AuthService) {}

    ngOnInit(): void {
        this.auth.getUser()
            .pipe(take(1),
                mergeMap((user: User) => {
                    this.user = user;
                    return this.productsService.getAll();
                }))
            .subscribe((products: Plant[]) => {
                this.makeProductsList(products);
                this.countSum();
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private makeProductsList(products: _Product[]): void {
        this.cart = this.cartService.get(this.user._id);
        const data = this.cart;
        this.products = products
            .filter((product: Product) =>
                data.find(item => item.id === product._id))
            .map((product: _Product) => {
                product.count =
                    data.find(item => item.id === product._id).count;
                return product;
            });
    }

    removeProduct(id: string): void {
        this.cartService.delete(this.user._id, id);
        this.makeProductsList(this.products);
    }

    countSum(): void {
        this.sum = 0;
        for (const item of this.products) {
            this.sum += item.cost * item.count;
        }
    }

    increase(p: _Product): void {
        if (p.inStock < p.count + 1) {
            return;
        }
        p.count++;
        this.countSum();
    }

    decrease(p: _Product): void {
        if (p.count - 1 <= 0) {
            return;
        }
        p.count--;
        this.countSum();
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

}
