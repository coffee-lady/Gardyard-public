import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../interfaces';

type EmptyFullRes = HttpResponse < null > ;

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    constructor(private http: HttpClient) {}

    create(data: Question): Observable < EmptyFullRes > {
        return this.http.post < null > ('api/questions/new', data, { observe: 'response' });
    }

    get(id: string): Observable < Question > {
        return this.http.get < Question > (`api/questions/${id}`);
    }

    update(id: string, data: Question): Observable < EmptyFullRes > {
        return this.http.put < null > (`api/questions/${id}`, data, { observe: 'response' });
    }

    delete(id: string): Observable < EmptyFullRes > {
        return this.http.delete < null > (`api/questions/${id}`, { observe: 'response' });
    }

    getAll(): Observable < Question[] > {
        return this.http.get < Question[] > (`api/questions`);
    }
}
