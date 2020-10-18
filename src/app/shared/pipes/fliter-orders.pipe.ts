import { Pipe, PipeTransform } from '@angular/core';
import { Order, States } from '../interfaces';

@Pipe({
    name: 'fliterOrders'
})
export class FliterOrdersPipe implements PipeTransform {

    transform(orders: Order[], state: string): Order[] {
        if (!orders.length) {
            return [];
        }

        if (!state) {
            return orders;
        }


        return orders.filter(order => order.state.toString() === state);
    }
}
