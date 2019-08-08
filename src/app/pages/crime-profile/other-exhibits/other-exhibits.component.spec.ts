import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExhibitsComponent } from './other-exhibits.component';

describe('OtherExhibitsComponent', () => {
  let component: OtherExhibitsComponent;
  let fixture: ComponentFixture<OtherExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
