import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

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
        Components.MapComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class ThemeModule {}
