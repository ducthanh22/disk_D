import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportbillComponent } from './exportbill.component';

describe('ExportbillComponent', () => {
  let component: ExportbillComponent;
  let fixture: ComponentFixture<ExportbillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportbillComponent]
    });
    fixture = TestBed.createComponent(ExportbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
