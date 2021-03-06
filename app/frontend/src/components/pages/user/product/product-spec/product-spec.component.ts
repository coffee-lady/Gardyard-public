import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Plant, User } from 'app/frontend/src/interfaces';
import { AuthService, CartService } from 'app/frontend/src/services';
import { AlertService } from 'app/frontend/src/services';
import { productAnimation } from '../product-animaiton';
import { ProductDataService } from 'app/frontend/src/services';

@Component({
    selector: 'app-product-spec',
    templateUrl: './product-spec.component.html',
    styleUrls: ['./product-spec.component.scss'],
    animations: [productAnimation]
})
export class ProductSpecComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    product: Plant;
    averageRate = 0;
    userId = 'anonymous';

    constructor(private cart: CartService,
        private alert: AlertService,
        private productDataService: ProductDataService,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.product = this.productDataService.get();
        for (const rate of this.product.rates) {
            this.averageRate += rate;
        }
        this.averageRate /= this.product.rates.length;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    addToCart(): void {
        this.authService.getUser().subscribe((user: User) => {
            if (user) {
                this.userId = user._id;
            }
            this.cart.set(this.userId, { id: this.product._id, count: 1 });
            this.alert.fire('Success', 'The product was successfully added to the cart!', false);
        }, () => {
            this.alert.fire('Error', 'Something went wrong.', false);
        });
    }
}
