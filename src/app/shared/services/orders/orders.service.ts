import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private http: HttpClient) {}

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
