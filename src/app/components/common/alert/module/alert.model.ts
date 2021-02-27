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

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
