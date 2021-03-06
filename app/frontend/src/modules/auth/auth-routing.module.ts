import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Components from 'app/frontend/src/components';

const routes: Routes = [
    { path: 'login', component: Components.LoginComponent, pathMatch: 'full' },
    { path: 'register', component: Components.RegisterComponent, pathMatch: 'full' },
    { path: '', redirectTo: 'auth/register', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
