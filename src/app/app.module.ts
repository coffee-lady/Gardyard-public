import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor, LoaderInterceptor } from 'src/app/interceptors';

import { AppRoutingModule } from './app-routing.module';

import * as Components from 'src/app/components';
import * as Modules from 'src/app/modules';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Modules.AppCommonModule,
        Modules.AdminModule,
        Modules.AuthModule,
        Modules.RootModule,
        Modules.UserModule
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
    bootstrap: [Components.AppComponent]
})
export class AppModule {}
