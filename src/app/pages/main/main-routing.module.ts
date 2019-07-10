import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { AboutComponent } from './about/about.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { ObjectViewComponent } from './object-view/object-view.component';
import { ContentFrameComponent } from './field-service/content-frame/content-frame.component';
import { WorkersComponent } from './field-service/workers/workers.component';
import { EditarEspecialistaComponent } from './field-service/editar-especialista/editar-especialista.component';
import { AsignacionComponent } from './field-service/asignacion/asignacion.component';
import { EspecialistaComponent } from './field-service/especialista/especialista.component';
import { CronogramaComponent } from './field-service/cronograma/cronograma.component';

import { SearchComponent } from './equipment/search/search.component';
import { PerfilComponent } from './field-service/perfil/perfil.component';
import { EstadisticasComponent } from './field-service/estadisticas/estadisticas.component';
import { AsignacionesEliminadasComponent } from './field-service/asignaciones-eliminadas/asignaciones-eliminadas.component';
import { DetallesComponent } from './equipment/detalles/detalles.component';
import { ConsultaContentComponent } from './equipment/consulta-content/consulta-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'widgets',
        component: WidgetsComponent
      },
      {
        path: 'objectView',
        component: ObjectViewComponent
      },
      {
        path: 'consultaEquipos',
        component: ConsultaContentComponent,
        children: [
          {path: '',pathMatch: 'full', redirectTo: 'busqueda'},
          {path: 'busqueda', component: SearchComponent},
          // {path: 'crearEquipo', component:}
          {path: 'detalles/:searchTerm', component: DetallesComponent}
        ]
      },
      {
        path: 'field-service',
        component: ContentFrameComponent,
        children: [
          // {path: '',pathMatch: 'full', redirectTo: 'workers', outlet: 'fieldServiceOutlet'},
          // {path: 'workers', component: WorkersComponent, outlet: "fieldServiceOutlet"} 
          {path: '',pathMatch: 'full', redirectTo: 'workers'},
          {path: 'workers', component: WorkersComponent},
          {path: 'formularioEdicionEspecialista', component: EditarEspecialistaComponent},
          {path: 'formularioAsignacion', component: AsignacionComponent},
          {path: 'formularioEspecialista', component: EspecialistaComponent},
          {path: 'cronograma', component: CronogramaComponent},
          {path: 'perfil', component: PerfilComponent},
          {path: 'estadisticas', component: EstadisticasComponent},
          {path: 'asignacionesEliminadas', component: AsignacionesEliminadasComponent}
        ]
      },
      {
        path: '**',
        redirectTo: 'field-service'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
