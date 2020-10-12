import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    get(id: string): Cart[] {
        return JSON.parse(localStorage.getItem(`cart/${id}`));
    }

    set(id: string, data: Cart[]): void {
        localStorage.setItem(`cart/${id}`, JSON.stringify(data));
    }

    clear(id: string): void {
        localStorage.removeItem(`cart/${id}`);
    }
}
