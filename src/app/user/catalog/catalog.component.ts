import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take, mergeMap } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { CartDragDropService, ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
    private unsubscribe$ = new Subject();

    loading = true;
    products: Plant[] = [];
    searchString = '';

    @ViewChild('cart')
    cartElem: ElementRef;

    @ViewChildren('catalogItem')
    catalogItems: QueryList < ElementRef > ;

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router,
        private dragDrop: CartDragDropService) {}

    ngOnInit(): void {
        this.productsService.getAll()
            .subscribe((products: Plant[]) => {
                this.products = products;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });

        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });
    }

    ngAfterViewInit(): void {
        this.dragDrop.init(this.cartElem);
        this.dragDrop.setClasses('cart_drag-out', 'cart_drag-enter', 'cart__img_drag');

        for (const item of this.catalogItems) {
            this.dragDrop.makeDraggable(item);
        }
        this.catalogItems.changes.subscribe((items: ElementRef[]) => {
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

    isCatalogScrollable(): boolean {
        return this.products.length * 100 > document.documentElement.clientHeight - 239;
    }
}
