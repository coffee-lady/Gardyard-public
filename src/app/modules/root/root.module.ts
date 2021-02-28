import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as Components from 'src/app/components';
import * as Modules from 'src/app/modules';

@NgModule({
    declarations: [
        Components.AppComponent,
        Components.MainComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Modules.AppCommonModule,
    ],
    exports: [
        Components.AppComponent,
        Components.MainComponent,
    ]
})
export class RootModule {}
