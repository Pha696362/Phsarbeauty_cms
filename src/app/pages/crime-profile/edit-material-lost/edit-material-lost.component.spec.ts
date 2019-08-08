import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterialLostComponent } from './edit-material-lost.component';

describe('EditMaterialLostComponent', () => {
  let component: EditMaterialLostComponent;
  let fixture: ComponentFixture<EditMaterialLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMaterialLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaterialLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
