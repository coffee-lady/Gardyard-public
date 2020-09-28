import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
    constructor(private router: Router, private productsService: ProductsService) {}

    uploadFileButton: HTMLButtonElement;
    uploadFileInput: HTMLInputElement;
    fileName: string;
    fileNameSpanText = 'Browse...';

    form: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
        ]),
        // picture: new FormControl('', [Validators.required]),
        description: new FormControl('', [
            Validators.required,
            Validators.minLength(400)
        ]),
        cultivation: new FormControl('', [
            Validators.required,
            Validators.minLength(400)
        ]),
        inStock: new FormControl('', [Validators.required]),
        vendorCode: new FormControl('', [Validators.required]),
        numberOfSeeds: new FormControl('', [
            Validators.required,
            Validators.min(1)
        ]),
        cost: new FormControl('', [
            Validators.required,
            Validators.min(0)
        ]),
        care: new FormArray([
            new FormGroup({
                param: new FormControl('', [Validators.required]),
                value: new FormControl('', [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl('', [Validators.required]),
                value: new FormControl('', [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl('', [Validators.required]),
                value: new FormControl('', [Validators.required]),
            }),
            new FormGroup({
                param: new FormControl('', [Validators.required]),
                value: new FormControl('', [Validators.required]),
            }),
        ])
    });

    ngOnInit(): void {
        this.uploadFileButton = document.querySelector('#uploadFile');
        this.uploadFileInput = document.querySelector('#inputFile');
    }

    clickFileButton(): void {
        this.uploadFileInput.click();
    }

    uploadFile(files: FileList): void {
        this.fileNameSpanText = files[0].name;
    }

    submit(): void {
        if (this.form.invalid) {
            console.log('invalid');
            return;
        }

        this.productsService
            .create(this.form.value)
            .subscribe((status: number) => {
                // console.log(status);
                // todo
            });
        return;
    }
}
