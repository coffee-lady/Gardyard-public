import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-hamburger-icon',
    templateUrl: './hamburger-icon.component.html',
    styleUrls: ['./hamburger-icon.component.scss']
})
export class HamburgerIconComponent implements OnInit {
    @Output() toggle = new EventEmitter();

    @ViewChild('ham')
    hamElem: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    toggleMobileMenu(): void {
        if (document.documentElement.clientWidth < 1600) {
            this.hamElem.nativeElement.classList.toggle('hav-icon_active');
        }
        this.toggle.emit();
    }

}
