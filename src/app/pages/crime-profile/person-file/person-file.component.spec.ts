import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFileComponent } from './person-file.component';

describe('PersonFileComponent', () => {
  let component: PersonFileComponent;
  let fixture: ComponentFixture<PersonFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
