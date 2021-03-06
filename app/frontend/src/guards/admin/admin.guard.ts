import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/frontend/src/interfaces';
import { AuthService } from 'app/frontend/src/services';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): Observable < boolean > {
        return this.authService
            .getUser()
            .pipe(
                map((user: User) => {
                    if (user && user.role === 'admin') {
                        return true;
                    }

                    this.router.navigateByUrl('/');
                    return false;
                }));
    }
}