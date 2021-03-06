import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/frontend/src/interfaces';
import { ApiService } from 'app/frontend/src/classes';

@Injectable({
    providedIn: 'root'
})
export class ProductsService extends ApiService < Product > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/products/';
    }
}
