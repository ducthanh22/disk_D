import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayproductsComponent } from './payproducts.component';

describe('PayproductsComponent', () => {
  let component: PayproductsComponent;
  let fixture: ComponentFixture<PayproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayproductsComponent]
    });
    fixture = TestBed.createComponent(PayproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
