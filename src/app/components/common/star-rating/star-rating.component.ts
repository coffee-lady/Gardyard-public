import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
    @Input() total: number;
    @Input() checked: number;
    @Input() uncheckedColor: string;
    @Input() checkedColor: string;
    @Input() forEstimating: boolean;
    @Output() estimate = new EventEmitter();

    colors: Array < string > = [];

    constructor() {}

    ngOnInit(): void {
        this.setColors(this.checked, this.total);
    }

    setColors(checked: number, total: number): void {
        for (let i = 0; i < total; i++) {
            if (i < checked) {
                this.colors[i] = this.checkedColor;
            } else {
                this.colors[i] = this.uncheckedColor;
            }
        }
    }

    ngOnChanges(): void {
        this.setColors(this.checked, this.total);
    }

    setEstimate(num: number): void {
        if (!this.forEstimating) {
            return;
        }
        this.setColors(num + 1, this.total);
        this.estimate.emit(num + 1);
    }
}
