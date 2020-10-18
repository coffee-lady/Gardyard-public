import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;
type DataType = User;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRoute = 'api/users/';

    constructor(private http: HttpClient) {}

    get(id: string): Observable < DataType > {
        return this.http.get < DataType > (this.apiRoute + id);
    }

    update(id: string, data: DataType): Observable < EmptyFullRes > {
        return this.http.put < null > (this.apiRoute + id, data, { observe: 'response' });
    }

    checkUserUniqueness(email: string): Observable < DataType > {
        return this.http.post < DataType > ('/api/users/exists', { searchString: email });
    }
}
