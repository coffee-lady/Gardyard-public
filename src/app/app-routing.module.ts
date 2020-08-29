import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HelpComponent } from './help/help.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [{
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, pathMatch: 'full' },
            { path: '', redirectTo: 'auth/register', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'help', component: HelpComponent, pathMatch: 'full' },
            { path: '', redirectTo: 'help', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
