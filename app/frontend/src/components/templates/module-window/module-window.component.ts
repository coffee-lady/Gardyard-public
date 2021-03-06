import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-module-window',
    templateUrl: './module-window.component.html',
    styleUrls: ['./module-window.component.scss']
})
export class ModuleWindowComponent implements OnInit {
    @ViewChild('moduleWindow') moduleWindow: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    open(): void {
        this.moduleWindow.nativeElement.style.display = 'flex';
    }

    close(): void {
        this.moduleWindow.nativeElement.style.display = 'none';
    }
}
