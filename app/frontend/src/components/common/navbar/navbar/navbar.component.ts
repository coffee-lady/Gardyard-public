import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/frontend/src/services';

import { Config } from 'app/frontend/src/config';
const NavbarConfig = Config.components.navbar;

import { NavbarController } from './controller';

import * as NavbarAnimations from './animations';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./styles/navbar.component.scss'],
    animations: [NavbarAnimations]
})
export class NavbarComponent implements OnInit {
    dropdownMenuState = false;
    hamHidden = true;
    controller: NavbarController;

    constructor(authService: AuthService) {
        this.controller = new NavbarController(authService);
    }

    ngOnInit(): void {
        this.controller.init();

        this.checkWidth();
    }

    checkWidth(): void {
        if (document.documentElement.clientWidth <= NavbarConfig.checkWidth) {
            this.dropdownMenuState = true;
            this.hamHidden = false;
        }
    }

    onLogout(): void {
        this.controller.logout();
    }

    toggleMobileMenu(): void {
        document.querySelector('.nav').classList.toggle('nav_cycled');
    }

    toggleDropdownState(): void {
        if (document.documentElement.clientWidth >= NavbarConfig.dropdown.toggleStateMinWidth) {
            this.dropdownMenuState = !this.dropdownMenuState;
        }
    }
}
