import { CartItem } from './cart';

export enum States {
    NEW,
    SENT,
    ARRIVED,
    CLOSED
}

export interface Order {
    _id ? : string;
    userId: string;
    date: Date;
    geo: string;
    state: States;
    products: CartItem[];
    rate ? : number;
}
