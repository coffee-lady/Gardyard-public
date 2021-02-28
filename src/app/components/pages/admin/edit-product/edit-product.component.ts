import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Plant } from 'src/app/interfaces';
import { ProductsService, AlertService } from 'src/app/services';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    private productId: string;
    title: string;

    constructor(
        private productsService: ProductsService,
        private alert: AlertService,
        private route: ActivatedRoute) {}

    form: FormGroup = new FormGroup({
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

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.productsService
            .get(this.productId)
            .pipe(take(1))
            .subscribe((product: Plant) => {
                this.title = product.title;
                this.form.patchValue(product);
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

    update(): void {
        if (!this.form.getRawValue()) {
            return;
        }
        this.productsService
            .update(this.productId, this.form.getRawValue())
            .pipe(take(1))
            .subscribe(() => {
                this.alert.fire('Successfully changed', 'Changes have been made to the database.', false);
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

    delete(): void {
        this.productsService
            .delete(this.productId)
            .pipe(take(1))
            .subscribe(() => {
                this.alert.fire('Successfully deleted', 'Changes have been made to the database.', false);
            }, () => {
                this.alert.fire('Error', 'Something went wrong.', false);
            });
    }

}
