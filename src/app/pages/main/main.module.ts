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
import { SearchComponent } from './equipment/search/search.component';
import { DetallesComponent } from './equipment/detalles/detalles.component';
import { ConsultaContentComponent } from './equipment/consulta-content/consulta-content.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EquipoComponent } from './equipment/equipo/equipo.component';


@NgModule({
  declarations: [
    MainComponent,
    AboutComponent,
    ObjectViewComponent,
    WidgetsComponent,
    SearchComponent,
    DetallesComponent,
    ConsultaContentComponent,
    EquipoComponent
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
    FieldServiceRoutingModule,
    TooltipModule.forRoot()
  ],
})
export class MainModule {}
