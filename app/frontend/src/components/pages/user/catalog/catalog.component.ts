import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Plant } from 'app/frontend/src/interfaces';
import { AuthService, CartDragDropService, ProductsService } from 'app/frontend/src/services';
import { AlertService } from 'app/frontend/src/services';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
    private unsubscribe$ = new Subject();

    products: Plant[] = [];
    searchString = '';
    recentlyViewed: string[];
    userId = 'anonymous';

    @ViewChild('cart')
    cartElem: ElementRef;

    @ViewChildren('catalogItem')
    catalogItems: QueryList < ElementRef > ;

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private authService: AuthService,
        private router: Router,
        private dragDrop: CartDragDropService) {}

    ngOnInit(): void {
        this.authService.getUser()
            .pipe(take(1))
            .subscribe(user => {
                if (user) {
                    this.userId = user._id;
                }
            });

        this.productsService.getAll()
            .pipe(take(1))
            .subscribe((products: Plant[]) => {
                this.products = products;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    ngAfterViewInit(): void {
        this.dragDrop.init(this.cartElem);
        this.dragDrop.setClasses('cart_drag-out', 'cart_drag-enter', 'cart__img_drag');

        for (const item of this.catalogItems) {
            this.dragDrop.makeDraggable(item);
        }
        this.catalogItems.changes
            .pipe(take(1))
            .subscribe((items: ElementRef[]) => {
                for (const item of items) {
                    this.dragDrop.makeDraggable(item);
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getFullInformation(id: string): void {
        this.router.navigateByUrl(`products/${id}/description`);
    }
}
