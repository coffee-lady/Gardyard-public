import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, timer, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserValidator {
    constructor(private userService: UserService) {}

    validate(
        control: AbstractControl
    ): Observable < ValidationErrors | null > {
        if (control.invalid || !control.value) { return null; }
        return timer(500).pipe(
            switchMap(() => {
                return this.userService
                    .checkUserUniqueness(control.value)
                    .pipe(
                        map((user: User) => {
                            return user ? { userExists: 'User already exists.' } :
                                null;
                        }),
                        catchError(() => of ({ availability: true })));
            }));
    }
}
