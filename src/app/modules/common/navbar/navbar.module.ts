import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

@NgModule({
    declarations: [
        Components.NavbarComponent,
        Components.NavLinkComponent,
        Components.HamburgerIconComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class NavbarModule {}
