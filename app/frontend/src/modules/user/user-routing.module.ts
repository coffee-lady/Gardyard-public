import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Guards from 'app/frontend/src/guards';
import * as Components from 'app/frontend/src/components';

const routes: Routes = [
    { path: 'help', component: Components.HelpComponent, pathMatch: 'full' },
    { path: 'catalog', component: Components.CatalogComponent, pathMatch: 'full' },
    { path: 'orders', component: Components.OrdersComponent, canActivate: [Guards.AuthGuard], pathMatch: 'full' },
    { path: 'contacts', component: Components.ContactsComponent, pathMatch: 'full' },
    { path: 'cart', component: Components.CartComponent, pathMatch: 'full' },
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },

    {
        path: 'products/:id',
        component: Components.ProductComponent,
        children: [
            { path: 'description', component: Components.ProductDescriptionComponent, pathMatch: 'full' },
            { path: 'cultivation', component: Components.ProductCultivationComponent, pathMatch: 'full' },
            { path: 'plant-care', component: Components.ProductCareComponent, pathMatch: 'full' },
            { path: 'specifications', component: Components.ProductSpecComponent, pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
