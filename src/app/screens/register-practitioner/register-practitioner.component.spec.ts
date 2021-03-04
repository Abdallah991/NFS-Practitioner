import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPractitionerComponent } from './register-practitioner.component';

describe('RegisterPractitionerComponent', () => {
  let component: RegisterPractitionerComponent;
  let fixture: ComponentFixture<RegisterPractitionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPractitionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPractitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
