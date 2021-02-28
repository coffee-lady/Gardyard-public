import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

@NgModule({
    declarations: [
        Components.LoginComponent,
        Components.RegisterComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class AuthModule {}
