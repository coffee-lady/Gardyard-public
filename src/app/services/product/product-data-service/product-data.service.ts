import { Injectable } from '@angular/core';
import { Plant } from 'src/app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProductDataService {
    product: Plant | null = null;
    constructor() {}

    set(product: Plant | null): void {
        this.product = product;
    }

    get(): Plant {
        return this.product;
    }
}
