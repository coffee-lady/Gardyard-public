import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from '../interfaces';
import { AuthService, RecentlyViewedService } from '../services';

@Pipe({
    name: 'sortByRecentlyViewed'
})
export class SortByRecentlyViewedPipe implements PipeTransform {
    constructor(private authService: AuthService,
        private recentlyViewedService: RecentlyViewedService) {}

    transform(products: Product[], userId: string): Product[] {
        if (!products.length) {
            return [];
        }

        const recentlyViewed = this.recentlyViewedService.get(userId);

        if (!recentlyViewed) {
            return products;
        }

        return products.sort((p1, p2) => {
            const isIncluded1 = recentlyViewed.includes(p1._id);
            const isIncluded2 = recentlyViewed.includes(p2._id);

            if (!isIncluded1 && isIncluded2) {
                return 1;
            }

            if (isIncluded1 && !isIncluded2) {
                return -1;
            }
            return 0;
        });

    }
}
