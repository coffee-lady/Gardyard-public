import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

@NgModule({
    declarations: [
        Components.NewProductComponent,
        Components.EditContactsComponent,
        Components.EditHelpComponent,
        Components.ManageOrdersComponent,
        Components.ManageProductsComponent,
        Components.EditProductComponent,
        Components.ManageUsersComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class AdminModule {}
