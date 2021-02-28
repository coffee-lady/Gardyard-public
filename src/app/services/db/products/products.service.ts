import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ApiService } from 'src/app/classes';

@Injectable({
    providedIn: 'root'
})
export class ProductsService extends ApiService < Product > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/products/';
    }
}
