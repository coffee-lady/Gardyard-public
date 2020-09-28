import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCultivationComponent } from './product-cultivation.component';

describe('ProductCultivationComponent', () => {
  let component: ProductCultivationComponent;
  let fixture: ComponentFixture<ProductCultivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCultivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCultivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
