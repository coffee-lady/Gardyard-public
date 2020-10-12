import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Cart, Order } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;

@Injectable({
    providedIn: 'root'
})
export class OrdersService implements OnDestroy {
    constructor(private http: HttpClient) {}

    ngOnDestroy(): void {}

    create(data: Order): Observable < EmptyFullRes > {
        return this.http.post < null > ('api/orders/new', data, { observe: 'response' });
    }

    get(id: string): Observable < Order > {
        return this.http.get < Order > (`api/orders/${id}`);
    }

    update(id: string, data: Order): Observable < EmptyFullRes > {
        return this.http.put < null > (`api/orders/${id}`, data, { observe: 'response' });
    }

    delete(id: string): Observable < EmptyFullRes > {
        return this.http.delete < null > (`api/orders/${id}`, { observe: 'response' });
    }

    getAll(): Observable < Order[] > {
        return this.http.get < Order[] > (`api/orders`);
    }
}
