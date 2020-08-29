import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../../../assets/styles/auth.scss'],
    animations: [
        trigger('anim', [
            transition('enter => leave', animate(500)),
            transition('leave => enter', animate(500)),
        ]),
    ]
})
export class RegisterComponent implements OnInit {

    constructor() {}

    state = 'leave';

    ngOnInit(): void {}

    change(): void {
        this.state = this.state === 'leave' ? 'enter' : 'leave';
    }

}
