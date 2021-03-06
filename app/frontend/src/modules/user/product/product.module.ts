import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'app/frontend/src/components';
import { AppCommonModule } from 'app/frontend/src/modules/common/app-common.module';

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
