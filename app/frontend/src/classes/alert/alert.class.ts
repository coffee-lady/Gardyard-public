import { AlertType } from './alert-types.enum';

export class Alert {
    id: string;
    type: AlertType;
    title: string;
    message: string;
    keepAfterRouteChange: boolean;

    constructor(init ? : Partial < Alert > ) {
        Object.assign(this, init);
    }
}
