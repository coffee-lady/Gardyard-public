import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { ProductsService } from 'src/app/shared/services';
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

    loading = true;
    product: Plant;

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private productDataService: ProductDataService) {}

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id');

        this.productsService
            .get(this.productId)
            .pipe(take(1))
            .subscribe((product: Plant) => {
                this.product = product;
                this.productDataService.set(product);
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });


        const loaderSubs = this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
                if (!status) {
                    loaderSubs.unsubscribe();
                }
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
