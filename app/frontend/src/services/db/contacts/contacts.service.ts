import { Injectable } from '@angular/core';
import { Contacts } from 'app/frontend/src/interfaces';
import { ApiService } from 'app/frontend/src/classes';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContactsService extends ApiService < Contacts > {
    constructor(protected http: HttpClient) {
        super(http);
        this.apiRoute = 'api/contacts/';
    }
}