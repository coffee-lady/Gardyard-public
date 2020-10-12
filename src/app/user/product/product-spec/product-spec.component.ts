import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { ProductsService } from 'src/app/shared/services';
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
    private productId: string;
    private unsubscribe$ = new Subject();

    loading = true;
    product: Plant;

    constructor(private loaderService: LoaderService,
        private route: ActivatedRoute,
        private productDataService: ProductDataService) {}

    ngOnInit(): void {
        this.productId = this.route.parent.snapshot.paramMap.get('id');
        this.product = this.productDataService.get();

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
}
