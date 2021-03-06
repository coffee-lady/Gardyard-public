import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Contacts } from 'app/frontend/src/interfaces';
import { ContactsService, AlertService } from 'app/frontend/src/services';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private contacts$ = new Subject();

    selected: Contacts = {
        longitude: 2.349095,
        latitude: 48.855250,
        title: ''
    };
    contacts: Contacts[] = [];

    constructor(private contactsService: ContactsService,
        private alert: AlertService) {}

    ngOnInit(): void {
        this.contacts$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.contactsService.getAll().pipe(take(1)).subscribe(contacts => {
                    this.contacts = contacts;
                    this.selected = this.contacts[0];
                }, () => {
                    this.alert.fire('Error', 'Something went wrong.', false);
                });
            });
        this.contacts$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.complete();
        this.unsubscribe$.unsubscribe();
    }

    select(item: Contacts): void {
        this.selected = item;
    }
}
