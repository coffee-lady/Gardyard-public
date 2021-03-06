import { AuthService } from 'app/frontend/src/services';
import { User } from 'app/frontend/src/interfaces';
import { take } from 'rxjs/operators';

export class NavbarController {
    user: User | null;

    constructor(private authService: AuthService) {}

    init(): void {
        this.getUser();
    }

    getUser(): void {
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe({
                next: (user: User | null) => {
                    this.user = user;
                }
            });
    }

    logout(): void {
        this.authService.signOut();
        this.user = null;
    }
}
