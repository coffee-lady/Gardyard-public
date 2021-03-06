import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/frontend/src/services';
import { Alert } from 'app/frontend/src/classes';
import { AlertController } from './controller';

import * as AlertAnimations from './animations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./styles/alert.component.scss'],
    animations: [AlertAnimations]
})
export class AlertComponent implements OnInit, OnDestroy {
    controller: AlertController;

    constructor(router: Router, alertService: AlertService) {
        this.controller = new AlertController(router, alertService);
    }

    ngOnInit(): void {
        this.controller.init();
    }

    ngOnDestroy(): void {
        this.controller.destroy();
    }

    removeAlert(alert: Alert): void {
        this.controller.removeAlert(alert);
    }
}
