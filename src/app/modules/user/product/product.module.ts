import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';
import { AppCommonModule } from 'src/app/modules/common/app-common.module';

@NgModule({
    declarations: [
        Components.ProductComponent,
        Components.ProductSpecComponent,
        Components.ProductDescriptionComponent,
        Components.ProductCultivationComponent,
        Components.ProductCareComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
    ],
    exports: [
        Components.ProductComponent,
        Components.ProductSpecComponent,
        Components.ProductDescriptionComponent,
        Components.ProductCultivationComponent,
        Components.ProductCareComponent,
    ],
})
export class ProductModule {}
