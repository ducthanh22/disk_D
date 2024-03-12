import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdmintemplateComponent } from './admin-admintemplate.component';

describe('AdminAdmintemplateComponent', () => {
  let component: AdminAdmintemplateComponent;
  let fixture: ComponentFixture<AdminAdmintemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdmintemplateComponent]
    });
    fixture = TestBed.createComponent(AdminAdmintemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
