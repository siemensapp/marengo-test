import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { FieldServiceRoutingModule } from './fieldservice-routing.module';


import { ContentFrameComponent } from './content-frame/content-frame.component';
import { WorkersComponent } from './workers/workers.component';
import { EsriMapComponent } from './esri-map/esri-map.component';

@NgModule({
  declarations: [ContentFrameComponent, WorkersComponent, EsriMapComponent],
  imports: [
    CommonModule,
    // Ngx Bootstrap
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    // Simpl
    SimplMarengoNgModule,
    FieldServiceRoutingModule
  ]
})
export class FieldServiceModule { }
