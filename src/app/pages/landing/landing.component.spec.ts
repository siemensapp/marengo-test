import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { LandingComponent } from './landing.component';

describe('LandingComponent', function() {
  let comp: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LandingComponent],
        imports: [
          TranslateModule.forRoot(),
          RouterTestingModule,
          SimplMarengoNgModule
        ],
        providers: []
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should have an appliaction name SiMPL as text', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const h1 = compiled.querySelector('h1');
    expect(h1.innerText).toMatch(/APP\.NAME/i);
  });
});
