import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from './alert/alert.module';
import { MapModule } from './map/map.module';
import { NavbarModule } from './navbar/navbar.module';
import { ThemeModule } from './theme/theme.module';

import * as Components from 'app/frontend/src/components';
import * as Pipes from 'app/frontend/src/pipes';

@NgModule({
    declarations: [
        Components.NotFoundComponent,
        Pipes.FilterPipe,
        Pipes.FilterOrdersPipe,
        Pipes.FilterByCityPipe,
        Pipes.SortByRecentlyViewedPipe,
        Pipes.FilterUsersPipe,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AlertModule,
        MapModule,
        NavbarModule,
        ThemeModule
    ],
    exports: [
        Components.NotFoundComponent,
        Pipes.FilterPipe,
        Pipes.FilterOrdersPipe,
        Pipes.FilterByCityPipe,
        Pipes.SortByRecentlyViewedPipe,
        Pipes.FilterUsersPipe,
        AlertModule,
        MapModule,
        NavbarModule,
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AppCommonModule {}
