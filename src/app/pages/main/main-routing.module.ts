import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

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
import { TarifasComponent } from './field-service/tarifas/tarifas.component';
import { DetallesComponent } from './equipment/detalles/detalles.component';
import { ConsultaContentComponent } from './equipment/consulta-content/consulta-content.component';
import { EquipoComponent } from './equipment/equipo/equipo.component';
import { NewUserComponent} from './new-user/new-user.component';

import {AuthGuardService as AuthGuard} from '../main/services/auth-services/auth-guard.service';
import { ClienteComponent } from './cliente/cliente.component';
import { AjusteAdicionComponent } from './field-service/ajuste-adicion/ajuste-adicion.component';
import { EditAsignacionComponent } from './field-service/edit-asignacion/edit-asignacion.component';
import { NuevoPMComponent } from './field-service/nuevo-pm/nuevo-pm.component';


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
          {path: '',pathMatch: 'full', redirectTo: 'busqueda', canActivate:[AuthGuard]},
          {path: 'busqueda', component: SearchComponent, canActivate:[AuthGuard]},
          {path: 'nuevoEquipo', component:EquipoComponent, canActivate:[AuthGuard]},
          {path: 'detalles/:searchTerm', component: DetallesComponent, canActivate:[AuthGuard]},
          {path: 'editarEquipo/:searchTerm', component: EquipoComponent, canActivate:[AuthGuard]}
        ]
      },
      
      
      {
        path: 'field-service',
        component: ContentFrameComponent,
        children: [
          // {path: '',pathMatch: 'full', redirectTo: 'workers', outlet: 'fieldServiceOutlet'},
          // {path: 'workers', component: WorkersComponent, outlet: "fieldServiceOutlet"} 
          {path: '',pathMatch: 'full', redirectTo: 'workers'},
          {path: 'workers', component: WorkersComponent, canActivate:[AuthGuard] },
          {path: 'formularioEdicionEspecialista', component: EditarEspecialistaComponent, canActivate:[AuthGuard]},
          {path: 'formularioAsignacion', component: AsignacionComponent, canActivate:[AuthGuard]},
          {path: 'formularioEspecialista', component: EspecialistaComponent, canActivate:[AuthGuard]},
          {path: 'cronograma', component: CronogramaComponent, canActivate:[AuthGuard]},
          {path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard]},
          {path: 'estadisticas', component: EstadisticasComponent, canActivate:[AuthGuard]},
          {path: 'asignacionesEliminadas', component: AsignacionesEliminadasComponent, canActivate:[AuthGuard]},
          {path: 'edit-asignacion/:id', component: EditAsignacionComponent, canActivate: [AuthGuard]}
        ]
      },
      
      {
        path: 'ajustes-adiciones',
        component: AjusteAdicionComponent,
        children: [
          {path: '',pathMatch: 'full', redirectTo: 'modificarTarifas'},
          {path: 'modificarTarifa', component: TarifasComponent, canActivate:[AuthGuard] },
          {path: 'nuevoUsuario', component: NewUserComponent, canActivate:[AuthGuard]},
          {path: 'cliente', component: ClienteComponent, canActivate:[AuthGuard]},
          {path: 'newPM', component: NuevoPMComponent, canActivate:[AuthGuard]}
        ]
      },
      {
        path: '**',
        redirectTo: 'field-service'
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
