import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from './alert/alert.module';
import { MapModule } from './map/map.module';
import { NavbarModule } from './navbar/navbar.module';
import { ThemeModule } from './theme/theme.module';

import * as Components from 'src/app/components';
import * as Pipes from 'src/app/pipes';

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
        CommonModule,
        AlertModule,
        MapModule,
        NavbarModule,
        ThemeModule
    ]
})
export class AppCommonModule {}
