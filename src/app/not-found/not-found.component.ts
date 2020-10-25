import { Component, Input, OnDestroy, OnInit } from '@angular/core';
@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    @Input() title: string;
    @Input() text = '';

    constructor() {}
}
