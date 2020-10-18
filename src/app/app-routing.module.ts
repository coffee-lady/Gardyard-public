import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard, AuthGuard, ManagerGuard } from './shared/guards';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { MainComponent } from './main/main.component';

import { ProductComponent } from './user/product/product/product.component';
import { ProductSpecComponent } from './user/product/product-spec/product-spec.component';
import { ProductCultivationComponent } from './user/product/product-cultivation/product-cultivation.component';
import { ProductCareComponent } from './user/product/product-care/product-care.component';

import { ContactsComponent } from './user/contacts/contacts.component';
import { CartComponent } from './user/cart/cart.component';
import { CatalogComponent } from './user/catalog/catalog.component';
import { HelpComponent } from './user/help/help.component';

import { NewProductComponent } from './admin/new-product/new-product.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { EditHelpComponent } from './admin/edit-help/edit-help.component';
import { EditContactsComponent } from './admin/edit-contacts/edit-contacts.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ProductDescriptionComponent } from './user/product/product-description/product-description.component';
import { OrdersComponent } from './user/orders/orders.component';

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
            { path: 'orders', component: OrdersComponent, pathMatch: 'full' },
            { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
            { path: 'cart', canActivate: [AuthGuard], component: CartComponent, pathMatch: 'full' },
            {
                path: 'products/:id',
                component: ProductComponent,
                children: [
                    { path: 'description', component: ProductDescriptionComponent, pathMatch: 'full' },
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
                    {
                        path: 'products/:id',
                        component: EditProductComponent,
                        canActivate: [AdminGuard],
                        pathMatch: 'full'
                    },
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
