import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectListsComponent } from './suspect-lists.component';

describe('SuspectListsComponent', () => {
  let component: SuspectListsComponent;
  let fixture: ComponentFixture<SuspectListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
