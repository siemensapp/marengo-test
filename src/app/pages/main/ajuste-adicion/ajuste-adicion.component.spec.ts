import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteAdicionComponent } from './ajuste-adicion.component';

describe('AjusteAdicionComponent', () => {
  let component: AjusteAdicionComponent;
  let fixture: ComponentFixture<AjusteAdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjusteAdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteAdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
