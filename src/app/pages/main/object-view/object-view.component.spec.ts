import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { ObjectViewComponent } from './object-view.component';

describe('ObjectViewComponet', function() {
  let comp: ObjectViewComponent;
  let fixture: ComponentFixture<ObjectViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ObjectViewComponent],
        imports: [
          HttpClientModule,
          TranslateModule.forRoot(),
          SimplMarengoNgModule
        ],
        providers: []
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectViewComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

});
