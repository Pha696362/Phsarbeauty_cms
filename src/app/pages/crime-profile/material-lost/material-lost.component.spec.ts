import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLostComponent } from './material-lost.component';

describe('MaterialLostComponent', () => {
  let component: MaterialLostComponent;
  let fixture: ComponentFixture<MaterialLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
