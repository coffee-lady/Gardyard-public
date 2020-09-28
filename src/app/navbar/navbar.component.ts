import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services';
import { User } from '../shared/interfaces';
import { AlertService } from '../_alert';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
    user: User | null;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUser().subscribe((user: User | null) => {
            this.user = user;
        });
    }

    logout(): void {
        this.authService.signOut();
        this.user = null;
    }

    toggleMobileMenu(): void {
        document.querySelector('.nav').classList.toggle('nav_cycled');
    }
}
