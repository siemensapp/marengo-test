import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaContentComponent } from './consulta-content.component';

describe('ConsultaContentComponent', () => {
  let component: ConsultaContentComponent;
  let fixture: ComponentFixture<ConsultaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
