import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../interfaces';
import { ApiService } from 'src/app/classes';

@Injectable({
    providedIn: 'root'
})
export class OrdersService extends ApiService < Order > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/orders/';
    }
}
