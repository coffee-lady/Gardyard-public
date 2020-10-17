import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant, User } from 'src/app/shared/interfaces';
import { AuthService, CartService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';
import { productAnimation } from '../product-animaiton';
import { ProductDataService } from '../product-data-service/-product-data.service';

@Component({
    selector: 'app-product-spec',
    templateUrl: './product-spec.component.html',
    styleUrls: ['./product-spec.component.scss'],
    animations: [productAnimation]
})
export class ProductSpecComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    loading = true;
    product: Plant;
    averageRate = 0;

    constructor(private loaderService: LoaderService,
        private cart: CartService,
        private alert: AlertService,
        private productDataService: ProductDataService,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.product = this.productDataService.get();
        for (const rate of this.product.rates) {
            this.averageRate += rate;
        }
        this.averageRate /= this.product.rates.length;

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

    addToCart(): void {
        this.authService.getUser().subscribe((user: User) => {
            this.cart.set(user._id, { id: this.product._id, count: 1 });
            this.alert.fire('Success', 'The product was successfully added to the cart!', false);
        }, () => {
            this.alert.fire('Error', 'Something went wrong.', false);
        });
    }
}
