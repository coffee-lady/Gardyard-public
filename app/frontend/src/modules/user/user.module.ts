import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from 'app/frontend/src/components';

import { ProductModule } from './product/product.module';
import { AppCommonModule } from 'app/frontend/src/modules/common/app-common.module';

@NgModule({
    declarations: [
        Components.HelpComponent,
        Components.CatalogComponent,
        Components.CartComponent,
        Components.OrdersComponent,
        Components.ContactsComponent,
    ],
    imports: [
        CommonModule,
        ProductModule,
        AppCommonModule,
    ],
    exports: [
        Components.HelpComponent,
        Components.CatalogComponent,
        Components.CartComponent,
        Components.OrdersComponent,
        Components.ContactsComponent,
        ProductModule,
    ],
})
export class UserModule {}