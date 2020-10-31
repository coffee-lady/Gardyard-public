import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../interfaces';
import { map } from 'rxjs/operators';

type EmptyFullRes = HttpResponse < null > ;
type DataType = User;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRoute = 'api/users/';
    private changed = false;
    data: DataType[] = [];

    constructor(private http: HttpClient) {}

    checkUserUniqueness(email: string): Observable < DataType > {
        if (this.data.length && !this.changed) {
            return of(this.data.find(x => x.email === email));
        }
        this.changed = false;
        return this.http.post < DataType > ('/api/users/exists', { searchString: email });
    }

    create(data: DataType): Observable < EmptyFullRes > {
        this.changed = true;
        return this.http.post < null > (this.apiRoute + 'new', data, { observe: 'response' });
    }

    get(id: string): Observable < DataType > {
        if (this.data.length && !this.changed) {
            return of(this.data.find(x => x._id === id));
        }
        this.changed = false;
        return this.http.get < DataType > (this.apiRoute + id);
    }

    update(id: string, data: DataType): Observable < EmptyFullRes > {
        this.changed = true;
        return this.http.put < null > (this.apiRoute + id, data, { observe: 'response' });
    }

    delete(id: string): Observable < EmptyFullRes > {
        this.changed = true;
        return this.http.delete < null > (this.apiRoute + id, { observe: 'response' });
    }

    getAll(): Observable < DataType[] > {
        if (this.data.length && !this.changed) {
            return of(this.data);
        }

        this.changed = false;
        return this.http.get < DataType[] > (this.apiRoute)
            .pipe(map(data => {
                this.data = data;
                return data;
            }));
    }
}
