import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/frontend/src/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest < unknown > , next: HttpHandler): Observable < HttpEvent < unknown >> {
        request = request.clone({
            headers: request.headers.set('Authorization', this.authService.getAuthorizationHeaders()),
        });
        return next.handle(request);
    }
}
