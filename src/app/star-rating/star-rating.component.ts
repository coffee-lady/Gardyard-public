import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
    @Input() total: number;
    @Input() checked: number;
    @Input() uncheckedColor: string;
    @Input() checkedColor: string;

    colors: Array < string > = [];

    constructor() {}

    ngOnInit(): void {
        for (let i = 0; i < this.total; i++) {
            if (i < this.checked) {
                this.colors[i] = this.checkedColor;
            } else {
                this.colors[i] = this.uncheckedColor;
            }
        }
    }

}
