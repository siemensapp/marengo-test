import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  primaryLinks = [
    {
      title: 'Field Service',
      link: 'field-service/workers'
    },
    {
      title: 'Consulta Equipos',
      link: 'objectView'
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
