import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoComponent } from '../logo/logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        LogoComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        BrowserAnimationsModule
    ]
})
export class AuthModule {}
