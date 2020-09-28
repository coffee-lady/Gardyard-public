import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor } from './shared/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { ProductComponent } from './client/product/product/product.component';
import { ProductSpecComponent } from './client/product/product-spec/product-spec.component';
import { ProductDescriptionComponent } from './client/product/product-description/product-description.component';
import { ProductCultivationComponent } from './client/product/product-cultivation/product-cultivation.component';
import { ProductCareComponent } from './client/product/product-care/product-care.component';

import { ContactsComponent } from './client/contacts/contacts.component';
import { CartComponent } from './client/cart/cart.component';
import { CatalogComponent } from './client/catalog/catalog.component';
import { HelpComponent } from './client/help/help.component';
import { OrdersComponent } from './client/orders/orders.component';

import { NewProductComponent } from './admin/new-product/new-product.component';
import { EditContactsComponent } from './admin/edit-contacts/edit-contacts.component';
import { EditHelpComponent } from './admin/edit-help/edit-help.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { NavLinkComponent } from './navbar/nav-link/nav-link.component';

import { AlertModule } from './_alert';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        LogoComponent,
        HelpComponent,
        NavbarComponent,
        MainComponent,
        CatalogComponent,
        CartComponent,
        OrdersComponent,
        ProductComponent,
        ProductSpecComponent,
        ProductDescriptionComponent,
        ProductCultivationComponent,
        ProductCareComponent,
        ContactsComponent,
        NewProductComponent,
        EditContactsComponent,
        EditHelpComponent,
        ManageOrdersComponent,
        ManageProductsComponent,
        EditProductComponent,
        NavLinkComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AlertModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }, ],
    bootstrap: [AppComponent]
})
export class AppModule {}
