import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';
import { AppCommonModule } from 'src/app/modules/common/app-common.module';

@NgModule({
    declarations: [
        Components.LoginComponent,
        Components.RegisterComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AppCommonModule,
    ],
    exports: [
        Components.LoginComponent,
        Components.RegisterComponent,
    ]
})
export class AuthModule {}
