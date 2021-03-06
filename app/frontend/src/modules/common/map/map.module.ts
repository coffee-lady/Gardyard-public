import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from 'app/frontend/src/components';

@NgModule({
    declarations: [
        Components.MapComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Components.MapComponent,
    ],
})
export class MapModule {}
