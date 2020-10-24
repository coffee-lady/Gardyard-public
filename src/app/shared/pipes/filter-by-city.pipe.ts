import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../interfaces';

@Pipe({
    name: 'filterByCity'
})
export class FilterByCityPipe implements PipeTransform {

    transform(orders: Order[], geoId: string): Order[] {
        if (!orders.length) {
            return [];
        }

        if (!geoId) {
            return orders;
        }
        return orders.filter(order => order.geo === geoId);
    }
}
