import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { AboutComponent } from './about.component';

describe('AboutComponent', function() {
  let comp: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AboutComponent],
        imports: [
          TranslateModule.forRoot(),
          SimplMarengoNgModule
        ],
        providers: []
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should have an h2 element with License as text', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const h2 = compiled.querySelector('h2');
    expect(h2.innerText).toMatch(/about/i);
  });
});
