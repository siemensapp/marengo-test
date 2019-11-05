import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentFrameComponent } from './content-frame/content-frame.component';
import { WorkersComponent } from './workers/workers.component';



const routes: Routes = [
    { path: 'field-service', component: ContentFrameComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'workers', outlet: "fieldServiceOutlet"},
        {path: 'workers', component: WorkersComponent, outlet: "fieldServiceOutlet"} 
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldServiceRoutingModule {}