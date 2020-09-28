import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard, AuthGuard, ManagerGuard } from './shared/guards';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { MainComponent } from './main/main.component';

import { HelpComponent } from './client/help/help.component';
import { CatalogComponent } from './client/catalog/catalog.component';
import { CartComponent } from './client/cart/cart.component';
import { ContactsComponent } from './client/contacts/contacts.component';

import { ProductCareComponent } from './client/product/product-care/product-care.component';
import { ProductCultivationComponent } from './client/product/product-cultivation/product-cultivation.component';
import { ProductSpecComponent } from './client/product/product-spec/product-spec.component';
import { ProductComponent } from './client/product/product/product.component';

import { NewProductComponent } from './admin/new-product/new-product.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { EditHelpComponent } from './admin/edit-help/edit-help.component';
import { EditContactsComponent } from './admin/edit-contacts/edit-contacts.component';

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
        component: MainComponent,
        children: [
            { path: 'help', component: HelpComponent, pathMatch: 'full' },
            { path: 'catalog', component: CatalogComponent, pathMatch: 'full' },
            { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
            { path: 'cart', canActivate: [AuthGuard], component: CartComponent, pathMatch: 'full' },
            {
                path: 'product/:id',
                component: ProductComponent,
                children: [
                    { path: 'description', component: ProductCareComponent, pathMatch: 'full' },
                    { path: 'cultivation', component: ProductCultivationComponent, pathMatch: 'full' },
                    { path: 'plant-care', component: ProductCareComponent, pathMatch: 'full' },
                    { path: 'specifications', component: ProductSpecComponent, pathMatch: 'full' },
                ]
            },
            {
                path: 'admin',
                canActivate: [ManagerGuard],
                children: [
                    { path: 'new-product', component: NewProductComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'products', component: ManageProductsComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'orders', component: ManageOrdersComponent, pathMatch: 'full' },
                    { path: 'edit-help', component: EditHelpComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                    { path: 'edit-contacts', component: EditContactsComponent, canActivate: [AdminGuard], pathMatch: 'full' },
                ]
            },
            { path: '', redirectTo: 'help', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
