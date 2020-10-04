import { Component, ElementRef, Input, AfterViewInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements AfterViewInit {
    @Input() left: string;
    @Input() title: string;

    @ViewChild('tspan')
    span: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (document.documentElement.clientWidth >= 1024) {
            this.renderer.setStyle(this.span.nativeElement, 'padding-left', this.left + 'px');
        }
    }
}
