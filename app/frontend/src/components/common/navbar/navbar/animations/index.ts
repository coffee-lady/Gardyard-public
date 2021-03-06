import { trigger, transition, animate, keyframes, style, state } from '@angular/animations';

module.exports = [
    trigger('appearDisappear', [
        state('active', style({
            visibility: 'visible',
            opacity: '1',
        })),
        state('inactive', style({
            visibility: 'hidden',
            opacity: '0',
        })),
        transition('inactive => active', [
            animate('200ms ease-in', keyframes([
                style({
                    visibility: 'hidden',
                    opacity: '0',
                    transform: 'translateX(100%)',
                    offset: 0
                }),
                style({
                    visibility: 'visible',
                    opacity: '1',
                    transform: 'translateX(0%)',
                    offset: 1
                })
            ]))
        ]),

        transition('active => inactive', [
            animate('200ms ease-in', keyframes([
                style({
                    visibility: 'visible',
                    opacity: '1',
                    transform: 'translateX(0%)',
                    offset: 0
                }),
                style({
                    visibility: 'hidden',
                    opacity: '0',
                    transform: 'translateX(-100%)',
                    offset: 1
                })
            ]))
        ])
    ]),
]
