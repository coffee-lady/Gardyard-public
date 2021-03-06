import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as Components from 'app/frontend/src/components';
import { AppCommonModule } from 'app/frontend/src/modules/common/app-common.module';

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
