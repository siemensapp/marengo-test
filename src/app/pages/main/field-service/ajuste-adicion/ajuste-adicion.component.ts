import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from 'src/app/pages/main/services/data-retriever.service';

@Component({
  selector: 'app-ajuste-adicion',
  templateUrl: './ajuste-adicion.component.html',
  styleUrls: ['./ajuste-adicion.component.scss']
})
export class AjusteAdicionComponent implements OnInit {

  constructor(private DataRetriever: DataRetrieverService) { }

  secondaryNavItems = [
    {title: 'Modificar Tarifas', link: 'modificarTarifa'},
    {title: '+ UsuarioDesktop', link: 'nuevoUsuario'},
    {title: '+ Cliente', link: 'cliente'},
    {title: '+ ProjectManager', link: 'PM'}
  ]

  ngOnInit() {
  }

}
