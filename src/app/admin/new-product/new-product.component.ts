import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {
    constructor(
        private productsService: ProductsService,
        private alert: AlertService) {}

    form: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
        ]),
        picture: new FormControl('', [Validators.required]),
        description: new FormControl('', [
            Validators.required,
            Validators.minLength(400)
        ]),
        cultivation: new FormControl('', [
            Validators.required,
            Validators.minLength(400)
        ]),
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
        rates: new FormControl([5]),
        care: new FormArray([
            new FormGroup({
                param: new FormControl(null, [Validators.required]),
                value: new FormControl(null, [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl(null, [Validators.required]),
                value: new FormControl(null, [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl(null, [Validators.required]),
                value: new FormControl(null, [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl(null, [Validators.required]),
                value: new FormControl(null, [Validators.required]),
            }),
        ])
    });

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.productsService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe((res) => {
                    this.alert.fire(
                        'Success',
                        'The product was created. Response status: ' + res.status,
                        true);
                },
                () => {
                    this.alert.fire(
                        'Error',
                        'The product wasn\'t created.',
                        true);
                });
    }
}
