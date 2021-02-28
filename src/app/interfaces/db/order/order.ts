import { CartItem } from '../cart/cart_item';
import { OrderStates } from '../order-states/order-states';
import { DBType } from 'src/app/interfaces/common';

export interface Order extends DBType {
    No ? : number;
    date: Date;
    state: OrderStates;
    products: CartItem[];
    rate ? : number;
    userGeo: string;
    userId: string;
    userPhone ? : number;
}
