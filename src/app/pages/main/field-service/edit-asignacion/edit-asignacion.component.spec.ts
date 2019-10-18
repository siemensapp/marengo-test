import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAsignacionComponent } from './edit-asignacion.component';

describe('EditAsignacionComponent', () => {
  let component: EditAsignacionComponent;
  let fixture: ComponentFixture<EditAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
