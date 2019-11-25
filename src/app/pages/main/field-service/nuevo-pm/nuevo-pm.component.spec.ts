import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPMComponent } from './nuevo-pm.component';

describe('NuevoPMComponent', () => {
  let component: NuevoPMComponent;
  let fixture: ComponentFixture<NuevoPMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
