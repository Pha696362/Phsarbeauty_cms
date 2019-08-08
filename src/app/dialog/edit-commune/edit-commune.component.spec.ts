import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommuneComponent } from './edit-commune.component';

describe('EditCommuneComponent', () => {
  let component: EditCommuneComponent;
  let fixture: ComponentFixture<EditCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
