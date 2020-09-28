import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
    @Output() toggle = new EventEmitter();
    @Input() navHumHidden: boolean;

    constructor() {}

    ngOnInit(): void {}

    toggleMobileMenu(event): void {
        if (!this.navHumHidden && document.documentElement.clientWidth < 1600) {
            event.target.classList.toggle('hav-icon_active');
        }
        this.toggle.emit();
    }
}
