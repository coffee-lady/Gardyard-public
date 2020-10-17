import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleWindowComponent } from './module-window.component';

describe('ModuleWindowComponent', () => {
  let component: ModuleWindowComponent;
  let fixture: ComponentFixture<ModuleWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
