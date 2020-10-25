import { CartItem } from './cart';

export enum States {
    NEW,
    SENT,
    ARRIVED,
    CLOSED
}

export interface Order {
    _id ? : string;
    No ? : number;
    date: Date;
    state: States;
    products: CartItem[];
    rate ? : number;
    userGeo: string;
    userId: string;
    userPhone ? : number;
}
