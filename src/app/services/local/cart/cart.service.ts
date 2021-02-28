import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    get(userId: string): CartItem[] {
        return JSON.parse(localStorage.getItem(`cart/${userId}`));
    }

    set(userId: string, data: CartItem): void {
        let cart: CartItem[] = JSON.parse(localStorage.getItem(`cart/${userId}`));
        if (!cart) {
            cart = [];
        }
        const tmp = cart.find(p => p.id === data.id);
        if (tmp) {
            cart.splice(cart.indexOf(tmp), 1);
        }

        cart.push(data);
        localStorage.setItem(`cart/${userId}`, JSON.stringify(cart));
    }

    delete(userId: string, productId: string): void {
        const cart: CartItem[] = JSON.parse(localStorage.getItem(`cart/${userId}`));
        const product = cart.find(p => p.id === productId);
        cart.splice(cart.indexOf(product), 1);
        localStorage.removeItem(`cart/${userId}`);
        localStorage.setItem(`cart/${userId}`, JSON.stringify(cart));
    }

    clear(userId: string): void {
        localStorage.removeItem(`cart/${userId}`);
    }
}
