import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClienttemplateComponent } from './client-clienttemplate.component';

describe('ClientClienttemplateComponent', () => {
  let component: ClientClienttemplateComponent;
  let fixture: ComponentFixture<ClientClienttemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientClienttemplateComponent]
    });
    fixture = TestBed.createComponent(ClientClienttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
