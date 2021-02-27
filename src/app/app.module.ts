import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor, LoaderInterceptor } from './shared/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavLinkComponent } from './navbar/nav-link/nav-link.component';

import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

import { ProductComponent } from './user/product/product/product.component';
import { ProductSpecComponent } from './user/product/product-spec/product-spec.component';
import { ProductDescriptionComponent } from './user/product/product-description/product-description.component';
import { ProductCultivationComponent } from './user/product/product-cultivation/product-cultivation.component';
import { ProductCareComponent } from './user/product/product-care/product-care.component';

import { ContactsComponent } from './user/contacts/contacts.component';
import { CartComponent } from './user/cart/cart.component';
import { CatalogComponent } from './user/catalog/catalog.component';
import { HelpComponent } from './user/help/help.component';
import { OrdersComponent } from './user/orders/orders.component';

import { NewProductComponent } from './admin/new-product/new-product.component';
import { EditContactsComponent } from './admin/edit-contacts/edit-contacts.component';
import { EditHelpComponent } from './admin/edit-help/edit-help.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

import { AlertModule } from './_alert';
import { InputFileComponent } from './input-file/input-file.component';
import { PageTitleComponent } from './components/common/theme/page-title/page-title.component';
import { LoaderComponent } from './loader/loader/loader.component';

import { FilterPipe } from './shared/pipes/filterProducts.pipe';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { StarRatingComponent } from './components/common/star-rating/star-rating.component';
import { ModuleWindowComponent } from './components/templates/module-window/module-window.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FilterOrdersPipe } from './shared/pipes/filter-orders.pipe';
import { MapComponent } from './map/map.component';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { FilterByCityPipe } from './shared/pipes/filter-by-city.pipe';
import { SortByRecentlyViewedPipe } from './shared/pipes/sort-by-recently-viewed.pipe';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { FilterUsersPipe } from './shared/pipes/filter-users.pipe';

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
        NavLinkComponent,
        InputFileComponent,
        PageTitleComponent,
        LoaderComponent,
        FilterPipe,
        NotFoundComponent,
        StarRatingComponent,
        ModuleWindowComponent,
        DropdownComponent,
        CheckboxComponent,
        FilterOrdersPipe,
        MapComponent,
        HamburgerIconComponent,
        FilterByCityPipe,
        SortByRecentlyViewedPipe,
        ManageUsersComponent,
        FilterUsersPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AlertModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
