import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { AuthService, ProductsService, RecentlyViewedService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';
import { ProductDataService } from '../product-data-service/-product-data.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: []
})
export class ProductComponent implements OnInit, OnDestroy {
    private productId: string;
    private unsubscribe$ = new Subject();

    product: Plant;

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private router: Router,
        private recentlyViewedService: RecentlyViewedService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private productDataService: ProductDataService) {}

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.authService.getUser()
            .pipe(take(1))
            .subscribe(user => {
                this.recentlyViewedService.set((user ? user._id : 'anonymous'), this.productId)
            });

        this.productsService
            .get(this.productId)
            .pipe(take(1))
            .subscribe((product: Plant) => {
                this.product = product;
                this.productDataService.set(product);
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getFullInformation(id: string): void {
        this.router.navigateByUrl(`products/${id}`);
    }
}
