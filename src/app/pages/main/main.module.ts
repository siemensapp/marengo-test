import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { AboutComponent } from './about/about.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ObjectViewComponent } from './object-view/object-view.component';
import { SharedModule } from '../../shared';
import { WidgetsComponent } from './widgets/widgets.component';
import { FieldServiceModule } from './field-service/field-service.module';
import { FieldServiceRoutingModule } from './field-service/fieldservice-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    AboutComponent,
    ObjectViewComponent,
    WidgetsComponent
  ],
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    // Ngx Bootstrap
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    // Simpl
    SimplMarengoNgModule,
    SharedModule,
    MainRoutingModule,
    // Own Modules
    FieldServiceModule,
    FieldServiceRoutingModule
  ],
})
export class MainModule {}
