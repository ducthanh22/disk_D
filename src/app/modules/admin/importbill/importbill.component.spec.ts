import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportbillComponent } from './importbill.component';

describe('ImportbillComponent', () => {
  let component: ImportbillComponent;
  let fixture: ComponentFixture<ImportbillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportbillComponent]
    });
    fixture = TestBed.createComponent(ImportbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
