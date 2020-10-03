import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Plant } from 'src/app/shared/interfaces';
import { ProductsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-manage-products',
    templateUrl: './manage-products.component.html',
    styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

    products: Plant[] = [];

    constructor(private productsService: ProductsService, private alertService: AlertService) {}

    form: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
        ]),
        picture: new FormControl('', [Validators.required]),
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
        this.productsService.getAll().subscribe((products: Plant[]) => {
            this.products = products;
        }, () => {
            this.alertService.fire('Error', 'Something went wrong.', false);
        });
    }

}
