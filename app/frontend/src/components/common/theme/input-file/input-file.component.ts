import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./styles/input-file.component.scss']
})
export class InputFileComponent implements OnInit {
    @Input() form: FormGroup;
    @ViewChild('inputFile')

    uploadFileInput: ElementRef;

    fileName: string;
    fileNameSpanText = 'Browse...';
    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {}

    clickFileButton(): void {
        this.uploadFileInput.nativeElement.click();
    }

    uploadFile(files: FileList): void {
        this.fileNameSpanText = files[0].name;

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = () => {
            this.form.patchValue({ picture: reader.result });
        };

        this.cd.markForCheck();
    }
}
