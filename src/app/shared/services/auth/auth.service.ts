import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
import { User } from '../../interfaces';
import { TokenStorage } from './token.storage';

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user$: User | null = null;

    constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

    login(email: string, password: string): Observable < HttpResponse < { user ? : User, token ? : string } > > {
        console.log({ email, password });

        return this.http
            .post('/api/auth/login', { email, password }, { observe: 'response' })
            .pipe(map((response: HttpResponse < { user ? : User, token ? : string } > ) => {
                if (response.body.token) {
                    this.setUser(response.body.user);
                    this.tokenStorage.saveToken(response.body.token);
                }
                return response;
            }));
    }

    register(fullname: string, email: string, password: string, role: string):
        Observable < HttpResponse < { user: User, token: string } > > {
            return this.http
                .post('/api/auth/register', { fullname, email, password, role }, { observe: 'response' })
                .pipe(map((response: HttpResponse < { user: User, token: string } > ) => {
                    this.setUser(response.body.user);

                    this.tokenStorage.saveToken(response.body.token);
                    return response;
                }));
        }

    setUser(user: User | null): void {
        this.user$ = user;
    }

    getUser(): Observable < User | null > {
        return !this.user$ ? this.me() : of (this.user$);
    }

    signOut(): void {
        this.tokenStorage.signOut();
        this.setUser(null);
    }

    me(): Observable < User > {
        const token: string | null = this.tokenStorage.getToken();

        if (token === null) {
            return of(null);
        }

        return this.http.get < AuthResponse > ('/api/auth/me').pipe(
            tap(({ user }) => this.setUser(user)),
            pluck('user')
        );
    }

    getAuthorizationHeaders() {
        const token: string | null = this.tokenStorage.getToken() || '';
        return { Authorization: `Bearer ${token}` };
    }
}
