import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard, AuthGuard, ManagerGuard } from 'src/app/guards';

import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

import * as Components from 'src/app/components';

const routes: Routes = [{
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, pathMatch: 'full' },
            { path: '', redirectTo: 'auth/register', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: Components.MainComponent,
        children: [
            { path: 'help', component: Components.HelpComponent, pathMatch: 'full' },
            { path: 'catalog', component: Components.CatalogComponent, pathMatch: 'full' },
            { path: 'orders', component: Components.OrdersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
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
                canActivate: [ManagerGuard],
                children: [
                    { path: 'new-product', component: Components.NewProductComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'products', component: Components.ManageProductsComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    {
                        path: 'products/:id',
                        component: Components.EditProductComponent,
                        canActivate: [AdminGuard],
                        pathMatch: 'full'
                    },
                    { path: 'orders', component: Components.ManageOrdersComponent, pathMatch: 'full' },
                    { path: 'edit-help', component: Components.EditHelpComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'edit-contacts', component: Components.EditContactsComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'users', component: Components.ManageUsersComponent, canActivate: [AdminGuard], pathMatch: 'full' },
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
