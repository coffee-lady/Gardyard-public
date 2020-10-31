import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Contacts } from 'src/app/shared/interfaces';
import { ContactsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-edit-contacts',
    templateUrl: './edit-contacts.component.html',
    styleUrls: ['./edit-contacts.component.scss']
})
export class EditContactsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private contacts$ = new Subject();

    selected: Contacts = {
        longitude: 2.349095,
        latitude: 48.855250,
        title: ''
    };
    contacts: Contacts[] = [];
    form = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        latitude: new FormControl(null, [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
    });

    constructor(private contactsService: ContactsService,
        private alert: AlertService) {}

    ngOnInit(): void {
        this.contacts$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.contactsService.getAll().pipe(take(1)).subscribe(contacts => {
                    this.contacts = contacts;
                    if (this.contacts.length) {
                        this.selected = this.contacts[0];
                    }
                }, () => {
                    this.alert.fire('Error', 'Something went wrong.', false);
                });
            });
        this.contacts$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    create(): void {
        if (this.form.invalid) {
            return;
        }

        this.contactsService.create(this.form.getRawValue())
            .pipe(take(1))
            .subscribe(() => {
                this.alert.fire('Success', 'Contacts are created!', false);
                this.contacts$.next();
                this.form.reset();
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

    select(item: Contacts): void {
        this.selected = item;
    }

    setActive(event: Event): void {
        const prev = document.querySelector('.active') as HTMLElement;
        const elem = event.target as HTMLElement;
        if (prev) {
            prev.classList.remove('active');
        }
        elem.classList.add('active');
    }

    remove(id: string): void {
        this.contactsService
            .delete(id)
            .pipe(take(1))
            .subscribe(() => {
                this.contacts$.next();
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }
}
