import { trigger, transition, style, animate, keyframes } from '@angular/animations';

module.exports = [
    trigger('appearDisappear', [
        transition(':leave', [
            animate('500ms linear', keyframes([
                style({
                    opacity: 1,
                    transform: 'translateY(0%)',
                    offset: 0
                }),
                style({
                    opacity: .5,
                    transform: 'translateY(-50%)',
                    offset: .5
                }),
                style({
                    opacity: 0,
                    transform: 'translateY(-100%)',
                    offset: 1
                }),
            ]))
        ]),
        transition(':enter', [
            animate('300ms linear', keyframes([
                style({
                    opacity: 0,
                    offset: 0
                }),
                style({
                    opacity: .5,
                    offset: .5
                }),
                style({
                    opacity: 1,
                    offset: 1
                }),
            ]))
        ])
    ])
];
