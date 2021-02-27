import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../../interfaces';
import { ApiService } from 'src/app/classes';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService extends ApiService < Question > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/questions/';
    }
}
