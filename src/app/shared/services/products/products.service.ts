import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    create(data: Product): Observable < EmptyFullRes > {
        return this.http.post < null > ('api/products/new', data, { observe: 'response' });
    }

    get(id: string): Observable < Product > {
        return this.http.get < Product > (`api/products/${id}`);
    }

    update(id: string, data: Product): Observable < EmptyFullRes > {
        return this.http.put < null > (`api/products/${id}`, data, { observe: 'response' });
    }

    delete(id: string): Observable < EmptyFullRes > {
        return this.http.delete < null > (`api/products/${id}`, { observe: 'response' });
    }

    getAll(): Observable < Product[] > {
        return this.http.get < Product[] > (`api/products`);
    }
}
