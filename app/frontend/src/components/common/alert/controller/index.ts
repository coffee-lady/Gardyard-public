import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'app/frontend/src/services';
import { Alert } from 'app/frontend/src/classes';

import { Config } from 'app/frontend/src/config';
const AlertConfig = Config.components.alert;

export class AlertController {
    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) {}

    init(): void {
        this.subscribeToNewAlerts();
        this.subscribeToRouteChange();
    }

    destroy(): void {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    private subscribeToNewAlerts(): void {
        this.alertSubscription = this.alertService.onAlert()
            .subscribe({
                next: alert => {
                    this.addAlert(alert);
                }
            });
    }

    private subscribeToRouteChange(): void {
        this.routeSubscription = this.router.events
            .subscribe({
                next: event => {
                    if (event instanceof NavigationStart) {
                        this.filterAlerts();
                    }
                }
            });
    }

    private addAlert(alert: Alert): void {
        this.alerts.push(alert);

        if (this.alerts.length > AlertConfig.alertsMaxLength) {
            this.removeAlert(this.alerts[0]);
        }
    }

    private filterAlerts(): void {
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
    }

    removeAlert(alert: Alert): void {
        if (!this.alerts.includes(alert)) {
            return;
        }

        this.alerts = this.alerts.filter(x => x !== alert);
    }
}
