import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services';
import { User } from '../shared/interfaces';
import { trigger, transition, animate, keyframes, style, state } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('appearDisappear', [
            state('active', style({
                visibility: 'visible',
                opacity: '1',
            })),
            state('inactive', style({
                visibility: 'hidden',
                opacity: '0',
            })),
            transition('inactive => active', [
                animate('200ms ease-in', keyframes([
                    style({
                        visibility: 'hidden',
                        opacity: '0',
                        transform: 'translateX(100%)',
                        offset: 0
                    }),
                    style({
                        visibility: 'visible',
                        opacity: '1',
                        transform: 'translateX(0%)',
                        offset: 1
                    })
                ]))
            ]),

            transition('active => inactive', [
                animate('200ms ease-in', keyframes([
                    style({
                        visibility: 'visible',
                        opacity: '1',
                        transform: 'translateX(0%)',
                        offset: 0
                    }),
                    style({
                        visibility: 'hidden',
                        opacity: '0',
                        transform: 'translateX(-100%)',
                        offset: 1
                    })
                ]))
            ])
        ]),
    ]
})
export class NavbarComponent implements OnInit {
    user: User | null;
    dropdownMenuState = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe((user: User | null) => {
                this.user = user;
            });
        if (document.documentElement.clientWidth <= 1024) {
            this.dropdownMenuState = true;
        }
    }

    logout(): void {
        this.authService.signOut();
        this.user = null;
    }

    toggleMobileMenu(): void {
        document.querySelector('.nav').classList.toggle('nav_cycled');
    }
    toggleDropdownState(): void {
        if (document.documentElement.clientWidth >= 1024) {
            this.dropdownMenuState = !this.dropdownMenuState;
        }
    }
}
