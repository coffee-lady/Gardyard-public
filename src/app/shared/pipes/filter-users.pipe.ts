import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces';

@Pipe({
    name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

    transform(users: User[], searchString: string): User[] {
        if (!users.length) {
            return [];
        }

        if (!searchString) {
            return users;
        }

        const regex = new RegExp(searchString, 'i');
        return users.filter((user: User) => user.fullname.match(regex) || user.email.match(regex));
    }

}
