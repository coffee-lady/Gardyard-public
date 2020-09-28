import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {}

    create(plant: Plant): Observable < number > {
        return this.http.post < number > ('api/products/new', plant);
    }

    get(id: string): Observable < number > {
        return this.http.get < number > (`api/products/{$id}`);
    }

    update(id: string, plant: Plant): Observable < number > {
        return this.http.put < number > (`api/products/{$id}`, plant);
    }

    delete(id: string): Observable < number > {
        return this.http.delete < number > (`api/products/{$id}`);
    }

    getAll(): Observable < number > {
        return this.http.get < number > (`api/products`);
    }
}
