import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrExhibitComponent } from './cr-exhibit.component';

describe('CrExhibitComponent', () => {
  let component: CrExhibitComponent;
  let fixture: ComponentFixture<CrExhibitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrExhibitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
