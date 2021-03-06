import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'app/frontend/src/interfaces';

@Pipe({
    name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {

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
