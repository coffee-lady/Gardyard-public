import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contacts } from 'src/app/shared/interfaces';
import { ContactsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-edit-contacts',
    templateUrl: './edit-contacts.component.html',
    styleUrls: ['./edit-contacts.component.scss']
})
export class EditContactsComponent implements OnInit {
    private contacts$ = new Subject();

    title = 'My first AGM project';
    lat = 51.678418;
    lng = 7.809007;

    selected: Contacts = null;
    contacts: Contacts[] = [];
    form = new FormGroup({
        city: new FormControl(null, [Validators.required]),
        latitude: new FormControl(null, [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
    });

    constructor(private contactsService: ContactsService,
        private alert: AlertService) {}

    ngOnInit(): void {
        this.contacts$.subscribe(() => {
            this.contactsService.getAll().pipe(take(1)).subscribe(contacts => {
                this.contacts = contacts;
                this.selected = this.contacts[0];
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
        });
        this.contacts$.next();
    }

    create(): void {
        if (this.form.invalid) {
            return;
        }

        this.contactsService.create(this.form.getRawValue())
            .subscribe(() => {
                this.alert.fire('Success', 'Contacts are created!', false);
                this.contacts$.next();
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

    select(item: Contacts): void {
        this.selected = item;
    }
}
