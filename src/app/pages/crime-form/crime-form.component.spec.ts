import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeFormComponent } from './crime-form.component';

describe('CrimeFormComponent', () => {
  let component: CrimeFormComponent;
  let fixture: ComponentFixture<CrimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
