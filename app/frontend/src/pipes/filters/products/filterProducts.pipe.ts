import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'app/frontend/src/interfaces';

@Pipe({
    name: 'filterProducts'
})
export class FilterPipe implements PipeTransform {

    transform(products: Product[], searchString: string): Product[] {
        if (!products.length) {
            return [];
        }

        if (!searchString) {
            return products;
        }

        const regex = new RegExp(searchString, 'i');
        return products.filter((product: Product) => product.title.match(regex));
    }
}
