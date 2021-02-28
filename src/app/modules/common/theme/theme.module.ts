import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        Components.LoaderComponent,
        Components.LogoComponent,
        Components.InputFileComponent,
        Components.PageTitleComponent,
        Components.StarRatingComponent,
        Components.ModuleWindowComponent,
        Components.DropdownComponent,
        Components.CheckboxComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        Components.LoaderComponent,
        Components.LogoComponent,
        Components.InputFileComponent,
        Components.PageTitleComponent,
        Components.StarRatingComponent,
        Components.ModuleWindowComponent,
        Components.DropdownComponent,
        Components.CheckboxComponent,
    ]
})
export class ThemeModule {}
