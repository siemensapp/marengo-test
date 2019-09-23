import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplMarengoNgModule } from '@simpl/marengo-ng';

import { FieldServiceRoutingModule } from './fieldservice-routing.module';

import { ChartsModule } from 'ng2-charts';
import { ContentFrameComponent } from './content-frame/content-frame.component';
import { WorkersComponent } from './workers/workers.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EditarEspecialistaComponent } from './editar-especialista/editar-especialista.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AsignacionesEliminadasComponent } from './asignaciones-eliminadas/asignaciones-eliminadas.component';
import { ExcelService } from 'src/app/shared/excel.service';
import { TarifasComponent } from './tarifas/tarifas.component';

@NgModule({
  declarations: [ContentFrameComponent, WorkersComponent, EsriMapComponent, EditarEspecialistaComponent, AsignacionComponent, EspecialistaComponent, CronogramaComponent, PerfilComponent, EstadisticasComponent, AsignacionesEliminadasComponent, TarifasComponent],
  imports: [
    CommonModule,
    // Ngx Bootstrap
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    // Simpl
    SimplMarengoNgModule,
    ChartsModule,
    FieldServiceRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [ ExcelService ]
})
export class FieldServiceModule { }
