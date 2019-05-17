import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';

describe('WidgetsComponent', function() {
  let comp: WidgetsComponent;
  let fixture: ComponentFixture<WidgetsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [WidgetsComponent],
        imports: [
          AccordionModule.forRoot(),
          ButtonsModule.forRoot(),
          TabsModule.forRoot(),
          BsDropdownModule.forRoot(),
          TranslateModule.forRoot(),
          SimplMarengoNgModule
        ],
        providers: []
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should contain an accordion component', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const accordion = compiled.querySelector('accordion');
    expect(accordion).toBeDefined();
  });

  it('should contain a primary button containing the word primary', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const primaryButton = compiled.querySelector('button.btn.btn-primary');
    expect(primaryButton.innerText).toMatch(/primary/i);
  });
});
