import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    checkUserUniqueness(email: string): Observable < object > {
        return this.http.post('/api/users/exists', { searchString: email });
    }
}
