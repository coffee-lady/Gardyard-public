import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Alert } from 'app/frontend/src/classes';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor() {}

    private subject = new Subject < Alert > ();

    onAlert(): Observable < Alert > {
        return this.subject.asObservable();
    }

    fire(title: string, message: string, keepAfterRouteChange: boolean): void {
        this.alert(new Alert({ title, message, keepAfterRouteChange }));
    }

    alert(alert: Alert): void {
        this.subject.next(alert);
    }
}
