import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-frame',
  templateUrl: './content-frame.component.html',
  styleUrls: ['./content-frame.component.scss']
})
export class ContentFrameComponent implements OnInit {

  secondaryNavItems = [
    {title: '+ Asignación', link: '/jbkb'},
    {title: '+ Field Service', link: '/v hv h'},
    {title: 'Cronograma', link: '/hjhv'},
  ]

  
  constructor() { }

  ngOnInit() {
  }

}