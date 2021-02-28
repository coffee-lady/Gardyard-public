import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as Components from 'src/app/components';
import { AppCommonModule } from 'src/app/modules/common/app-common.module';

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
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AppCommonModule,
    ],
    exports: [
        Components.NewProductComponent,
        Components.EditContactsComponent,
        Components.EditHelpComponent,
        Components.ManageOrdersComponent,
        Components.ManageProductsComponent,
        Components.EditProductComponent,
        Components.ManageUsersComponent,
    ]
})
export class AdminModule {}
