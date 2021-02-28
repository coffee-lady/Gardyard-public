import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'src/app/components';

@NgModule({
    declarations: [
        Components.AppComponent,
        Components.MainComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class RootModule {}
