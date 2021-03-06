import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Guards from 'app/frontend/src/guards';
import * as Components from 'app/frontend/src/components';

const routes: Routes = [{
        path: 'auth',
        children: [
            { path: 'login', component: Components.LoginComponent, pathMatch: 'full' },
            { path: 'register', component: Components.RegisterComponent, pathMatch: 'full' },
            { path: '', redirectTo: 'auth/register', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: Components.MainComponent,
        children: [
            { path: 'help', component: Components.HelpComponent, pathMatch: 'full' },
            { path: 'catalog', component: Components.CatalogComponent, pathMatch: 'full' },
            { path: 'orders', component: Components.OrdersComponent, canActivate: [Guards.AuthGuard], pathMatch: 'full' },
            { path: 'contacts', component: Components.ContactsComponent, pathMatch: 'full' },
            { path: 'cart', component: Components.CartComponent, pathMatch: 'full' },
            {
                path: 'products/:id',
                component: Components.ProductComponent,
                children: [
                    { path: 'description', component: Components.ProductDescriptionComponent, pathMatch: 'full' },
                    { path: 'cultivation', component: Components.ProductCultivationComponent, pathMatch: 'full' },
                    { path: 'plant-care', component: Components.ProductCareComponent, pathMatch: 'full' },
                    { path: 'specifications', component: Components.ProductSpecComponent, pathMatch: 'full' },
                ]
            },
            {
                path: 'admin',
                canActivate: [Guards.ManagerGuard],
                children: [
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
                ]
            },
            { path: '', redirectTo: 'catalog', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
