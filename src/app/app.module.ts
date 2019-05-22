import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SiLandingPageModule, SimplMarengoNgModule } from '@simpl/marengo-ng';

import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'main',
    loadChildren: 'src/app/pages/main/main.module#MainModule'
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    SimplMarengoNgModule,
    SiLandingPageModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
