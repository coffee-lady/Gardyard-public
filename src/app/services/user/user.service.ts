import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/classes';
import { User } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService < User > {
    private apiRouteUserExists = '/api/users/exists';

    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/contacts/';
    }

    checkUserUniqueness(email: string): Observable < User > {
        if (this.data.length && !this.changed) {
            return of(this.data.find(x => x.email === email));
        }
        this.changed = false;
        return this.http.post < User > (this.apiRouteUserExists, { searchString: email });
    }
}
