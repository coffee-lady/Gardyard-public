import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

@NgModule({
    declarations: [
        Components.ProductComponent,
        Components.ProductSpecComponent,
        Components.ProductDescriptionComponent,
        Components.ProductCultivationComponent,
        Components.ProductCareComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class ProductModule {}
