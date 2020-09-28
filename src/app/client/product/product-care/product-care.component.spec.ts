import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCareComponent } from './product-care.component';

describe('ProductCareComponent', () => {
  let component: ProductCareComponent;
  let fixture: ComponentFixture<ProductCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
