import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { mergeMap, take, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-manage-products',
    templateUrl: './manage-products.component.html',
    styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private products$ = new Subject();

    loading = true;
    products: Plant[] = [];
    choosed: Plant | null = null;
    searchString = '';

    constructor(private productsService: ProductsService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router) {}

    form: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
        ]),
        picture: new FormControl(''),
        inStock: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.min(0)
        ]),
        vendorCode: new FormControl('', [Validators.required]),
        numberOfSeeds: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.min(1)
        ]),
        cost: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.min(0)
        ]),
    });

    ngOnInit(): void {
        this.products$
            .pipe(takeUntil(this.unsubscribe$),
                mergeMap(() => this.productsService.getAll()))
            .subscribe((products: Plant[]) => {
                this.products = products;
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
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

    update(): void {
        if (!this.form.getRawValue()) {
            return;
        }

        this.productsService
            .update(this.choosed._id, this.form.getRawValue())
            .pipe(take(1))
            .subscribe(() => {
                this.alertService.fire('Successfully changed', 'Changes have been made to the database.', false);
                this.form.reset();
                this.choosed = null;
                this.products$.next();
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    delete(): void {
        this.productsService
            .delete(this.choosed._id)
            .pipe(take(1))
            .subscribe(() => {
                this.alertService.fire('Successfully deleted', 'Changes have been made to the database.', false);
                this.form.reset();
                this.choosed = null;
                this.products$.next();
            }, () => {
                this.alertService.fire('Error', 'Something went wrong.', false);
            });
    }

    editInFullMode(): void {
        this.router.navigateByUrl(`admin/products/${this.choosed._id}`);
    }

    chooseItem(id: string): void {
        this.choosed = this.products.find(item => item._id === id);
        this.form.patchValue(this.choosed);
    }

    isCatalogScrollable(): boolean {
        return this.products.length * 100 > document.documentElement.clientHeight - 239;
    }
}
