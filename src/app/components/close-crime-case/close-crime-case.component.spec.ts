import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCrimeCaseComponent } from './close-crime-case.component';

describe('CloseCrimeCaseComponent', () => {
  let component: CloseCrimeCaseComponent;
  let fixture: ComponentFixture<CloseCrimeCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseCrimeCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseCrimeCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
