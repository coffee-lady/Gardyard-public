import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services';
import { Alert } from 'src/app/classes';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
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
        ]),
    ],
})
export class AlertComponent implements OnInit, OnDestroy {
    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) {}

    ngOnInit(): void {
        this.alertSubscription = this.alertService.onAlert()
            .subscribe(alert => {
                this.alerts.push(alert);
                if (this.alerts.length > 4) {
                    this.removeAlert(this.alerts[0]);
                }
            });

        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
            }
        });
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert): void {
        if (!this.alerts.includes(alert)) { return; }
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}
