import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces';
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): Observable < boolean > {
        return this.authService
            .getUser()
            .pipe(
                map((user: User) => {
                    if (user && (user.role === 'admin' || user.role === 'manager')) {
                        return true;
                    }

                    this.router.navigateByUrl('/');
                    return false;
                }));
    }
}
