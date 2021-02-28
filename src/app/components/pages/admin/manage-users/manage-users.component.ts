import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces';
import { UserService, AlertService } from 'src/app/services';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss'],
    animations: [
        trigger('appear', [
            transition(':enter', [
                animate('300ms ease-in', keyframes([
                    style({
                        opacity: 0,
                        transform: 'translateY(100%)',
                        offset: 0
                    }),
                    style({
                        opacity: 1,
                        transform: 'translateY(0%)',
                        offset: 1
                    }),
                ]))
            ]),
        ]),
    ],
})
export class ManageUsersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    constructor(private alertService: AlertService,
        private userService: UserService) {}

    users: User[] = [];
    selected: User | null = null;
    filter = '';

    ngOnInit(): void {
        this.userService
            .getAll()
            .pipe(take(1))
            .subscribe(users => {
                this.users = users;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    select(user: User): void {
        this.selected = user;
    }

    setRole(role: string): void {
        this.selected.role = role;
        this.users[this.users.indexOf(this.selected)] = this.selected;
        this.userService.update(this.selected._id, this.selected)
            .pipe(take(1))
            .subscribe(() => {
                this.alertService.fire('Success', 'Changes were applied.', false);
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
