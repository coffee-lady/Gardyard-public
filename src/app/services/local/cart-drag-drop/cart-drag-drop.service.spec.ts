import { TestBed } from '@angular/core/testing';

import { CartDragDropService } from './cart-drag-drop.service';

describe('CartDragDropService', () => {
    let service: CartDragDropService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartDragDropService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
