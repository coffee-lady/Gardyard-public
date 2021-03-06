import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Guards from 'app/frontend/src/guards';
import * as Components from 'app/frontend/src/components';

const routes: Routes = [{
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: Components.MainComponent,
        children: [{
                path: '',
                loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
            },
            {
                path: 'admin',
                canActivate: [Guards.ManagerGuard],
                loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
