import { Injectable } from '@angular/core';
import { DragAndDrop } from 'src/app/classes';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class CartDragDropService extends DragAndDrop {
    private id: string;
    constructor(private cart: CartService,
        private authService: AuthService) {
        super();
    }

    protected drop(event: DragEvent): void {
        super.drop(event);
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe((user: User) => {
                const data = {
                    id: this.id,
                    count: 1,
                };
                this.cart.set((user && user._id ? user._id : 'anonymous'), data);
            });
    }

    protected dragStart(event: DragEvent): void {
        super.dragStart(event);
        this.id = (event.target as HTMLElement).dataset.id;
    }

    protected dragEnd(event: DragEvent): void {
        super.dragEnd(event);
        this.id = null;
    }
}
