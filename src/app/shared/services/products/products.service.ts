import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {}

    create(plant: Plant): Observable < EmptyFullRes > {
        return this.http.post < null > ('api/products/new', plant, { observe: 'response' });
    }

    get(id: string): Observable < Plant > {
        return this.http.get < Plant > (`api/products/${id}`);
    }

    update(id: string, plant: Plant): Observable < EmptyFullRes > {
        return this.http.put < null > (`api/products/${id}`, plant, { observe: 'response' });
    }

    delete(id: string): Observable < EmptyFullRes > {
        return this.http.delete < null > (`api/products/${id}`, { observe: 'response' });
    }

    getAll(): Observable < Plant[] > {
        return this.http.get < Plant[] > (`api/products`);
    }
}
