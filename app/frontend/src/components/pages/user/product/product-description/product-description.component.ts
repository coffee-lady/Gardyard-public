import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Plant } from 'app/frontend/src/interfaces';
import { productAnimation } from '../product-animaiton';
import { ProductDataService } from 'app/frontend/src/services';

@Component({
    selector: 'app-product-description',
    templateUrl: './product-description.component.html',
    styleUrls: ['./product-description.component.scss'],
    animations: [productAnimation]
})
export class ProductDescriptionComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    product: Plant;

    constructor(private productDataService: ProductDataService) {}

    ngOnInit(): void {
        this.product = this.productDataService.get();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}