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
        path: 'field-service',
        component: ContentFrameComponent,
        children: [
          // {path: '',pathMatch: 'full', redirectTo: 'workers', outlet: 'fieldServiceOutlet'},
          // {path: 'workers', component: WorkersComponent, outlet: "fieldServiceOutlet"} 
          {path: '',pathMatch: 'full', redirectTo: 'workers'},
          {path: 'workers', component: WorkersComponent},
          {path: 'formularioEdicionEspecialista', component: EditarEspecialistaComponent},
          {path: 'formularioAsignacion', component: AsignacionComponent}
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
