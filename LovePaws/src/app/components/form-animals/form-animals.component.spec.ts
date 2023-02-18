import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnimalsComponent } from './form-animals.component';

describe('FormAnimalsComponent', () => {
  let component: FormAnimalsComponent;
  let fixture: ComponentFixture<FormAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnimalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
