import { Injectable } from '@angular/core';
import { Product } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class RecentlyViewedService {

    constructor() {}

    get(userId: string): string[] {
        return JSON.parse(localStorage.getItem(`recent/${userId}`));
    }

    set(userId: string, productId: string): void {
        let storage: string[] = JSON.parse(localStorage.getItem(`recent/${userId}`));
        if (!storage) {
            storage = [];
        }
        if (storage.includes(productId)) {
            return;
        }

        if (storage && storage.length > 4) {
            storage.pop();
        }

        storage.unshift(productId);
        localStorage.setItem(`recent/${userId}`, JSON.stringify(storage));
    }

    delete(userId: string, productId: string): void {
        const storage: string[] = JSON.parse(localStorage.getItem(`recent/${userId}`));
        storage.splice(storage.indexOf(productId), 1);
        localStorage.removeItem(`recent/${userId}`);
        localStorage.setItem(`recent/${userId}`, JSON.stringify(storage));
    }

    clear(userId: string): void {
        localStorage.removeItem(`recent/${userId}`);
    }
}
