import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-frame',
  templateUrl: './content-frame.component.html',
  styleUrls: ['./content-frame.component.scss']
})
export class ContentFrameComponent implements OnInit {

  secondaryNavItems = [
    {title: 'Trabajadores', link: 'workers'},
    {title: '+ Asignación', link: 'assignment '},
    {title: '+ Field Service', link: '/v hv h'},
    {title: 'Cronograma', link: '/hjhv'},
  ]

  mapCenter = [-74, 4.2];
  basemapType = 'topo';
  mapZoomLevel = 6;

  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

  
  constructor() { }

  ngOnInit() {
  }

}