import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Guards from 'app/frontend/src/guards';
import * as Components from 'app/frontend/src/components';

const routes: Routes = [
    { path: 'new-product', component: Components.NewProductComponent, canActivate: [Guards.AdminGuard], pathMatch: 'full' },
    { path: 'products', component: Components.ManageProductsComponent, canActivate: [Guards.AdminGuard], pathMatch: 'full' },
    {
        path: 'products/:id',
        component: Components.EditProductComponent,
        canActivate: [Guards.AdminGuard],
        pathMatch: 'full'
    },
    { path: 'orders', component: Components.ManageOrdersComponent, pathMatch: 'full' },
    { path: 'edit-help', component: Components.EditHelpComponent, canActivate: [Guards.AdminGuard], pathMatch: 'full' },
    { path: 'edit-contacts', component: Components.EditContactsComponent, canActivate: [Guards.AdminGuard], pathMatch: 'full' },
    { path: 'users', component: Components.ManageUsersComponent, canActivate: [Guards.AdminGuard], pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
