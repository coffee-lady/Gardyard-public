import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private products$ = new Subject();

    loading = true;
    products: Plant[] = [];
    searchString = '';

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router) {}

    ngOnInit(): void {
        this.products$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.productsService
                    .getAll()
                    .pipe(take(1))
                    .subscribe((products: Plant[]) => {
                        this.products = products;
                    }, () => {
                        this.alertService.fire('Error', 'Something went wrong.', false);
                    });
            });

        this.products$.next();

        const loaderSubs = this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
                if (!status) {
                    loaderSubs.unsubscribe();
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
