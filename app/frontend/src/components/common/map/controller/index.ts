import { take } from 'rxjs/operators';
import { Contacts } from 'app/frontend/src/interfaces';
import { ContactsService } from 'app/frontend/src/services';
import { Subject } from 'rxjs';

export class MapController {
    contacts: Contacts[] = [];
    onInit: Subject < Contacts[] > ;

    onInitCallback: (contacts: Contacts[]) => void;

    constructor(private contactsService: ContactsService) {
        this.onInit = new Subject < Contacts[] > ();
    }

    init(): void {
        this.contactsService.getAll()
            .pipe(take(1))
            .subscribe({
                next: contacts => {
                    this.contacts = contacts;
                    this.onInit.next(contacts);
                }
            });
    }

    getContacts(): Contacts[] {
        return this.contacts;
    }
}
