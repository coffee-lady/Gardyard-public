import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const productAnimation =
    trigger('productAnimation', [
        transition(':leave', [
            animate('150ms', keyframes([
                style({
                    offset: 0,
                    opacity: 1,
                    left: '0%'
                }),
                style({
                    offset: 1,
                    opacity: 0,
                    left: '-100%'
                }),
            ])),
        ]),
        transition(':enter', [
            animate('100ms', keyframes([
                style({
                    offset: 0,
                    opacity: 0,
                    // left: '0%'
                }),
                style({
                    offset: 1,
                    opacity: 1,
                    // left: '-100%'
                }),
            ])),
        ]),
    ])
