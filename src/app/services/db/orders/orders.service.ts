import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/interfaces';
import { ApiService } from 'src/app/classes';

@Injectable({
    providedIn: 'root'
})
export class OrdersService extends ApiService < Order > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/orders/';
    }

    getAllOfUser(userId: string): Observable < Order[] > {
        if (this.data.length && !this.changed) {
            return of(this.data.filter(x => x.userId === userId));
        }
        return this.http.get < Order[] > (this.apiRoute + 'user/' + userId);
    }
}
