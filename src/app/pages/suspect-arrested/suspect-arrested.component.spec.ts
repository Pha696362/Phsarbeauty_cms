import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectArrestedComponent } from './suspect-arrested.component';

describe('SuspectArrestedComponent', () => {
  let component: SuspectArrestedComponent;
  let fixture: ComponentFixture<SuspectArrestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectArrestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectArrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
