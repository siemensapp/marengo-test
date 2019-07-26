import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(){}

  getCurrentUserName() {
    return localStorage.getItem('name');
  }

  primaryLinks = [
    {
      title: 'Field Service',
      link: 'field-service/workers'
    },
    {
      title: 'Consulta Equipos',
      link: 'consultaEquipos'
    }
  ];

  footerLinks = [
    {
      title: 'Corporate Information',
      href: 'http://www.siemens.com/corporate_info'
    },
    {
      title: 'Privacy Policy',
      href: 'http://www.siemens.com/privacy'
    },
    {
      title: 'Terms of Use',
      href: 'http://www.siemens.com/corp/en/index/terms_of_use.htm'
    }
  ];

}
