import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SiFooterModule, SiNavbarModule } from '@simpl/marengo-ng';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientModule,
          TranslateModule.forRoot(),
          SiFooterModule,
          SiNavbarModule
        ],
        declarations: [MainComponent]
      }).compileComponents();
    })
  );

  it('should create the main', async(() => {
      const fixture = TestBed.createComponent(MainComponent);
      const main = fixture.debugElement.componentInstance;
      expect(main).toBeTruthy();
    })
  );

  it('should render top navigation', async(() => {
      const fixture = TestBed.createComponent(MainComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('si-navbar-primary').textContent).toBeDefined();
    })
  );

  it('should render footer', async(() => {
      const fixture = TestBed.createComponent(MainComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('si-footer').textContent).toBeDefined();
    })
  );
});
