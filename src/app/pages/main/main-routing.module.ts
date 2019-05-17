import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { AboutComponent } from './about/about.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { ObjectViewComponent } from './object-view/object-view.component';
import { ContentFrameComponent } from './field-service/content-frame/content-frame.component';

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
        component: ContentFrameComponent
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
