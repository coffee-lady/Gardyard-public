import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../theme/theme.module';
import * as Components from 'app/frontend/src/components';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        Components.NavbarComponent,
        Components.NavLinkComponent,
        Components.HamburgerIconComponent,
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ThemeModule
    ],
    exports: [
        Components.NavbarComponent,
        Components.NavLinkComponent,
        Components.HamburgerIconComponent,
    ],
})
export class NavbarModule {}
