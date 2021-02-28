import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from 'src/app/components';

import { ProductModule } from './product/product.module';

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
        ProductModule
    ]
})
export class UserModule {}
