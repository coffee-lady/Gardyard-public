import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
    path: 'auth',
    children: [
        { path: 'login', component: LoginComponent, pathMatch: 'full' },
        { path: 'register', component: RegisterComponent, pathMatch: 'full' },
        { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
