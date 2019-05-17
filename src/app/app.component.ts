import { Component } from '@angular/core';

import { LocalisationService } from './shared/localisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private localisationService: LocalisationService) {
    localisationService.detectLanguage();
  }
}
