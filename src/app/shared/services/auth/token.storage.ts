import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenStorage {
    private tokenKey = environment.jwtSecret;

    signOut(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.clear();
    }

    saveToken(token ? : string): void {
        if (!token) { return; }
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
    constructor() {}
}
