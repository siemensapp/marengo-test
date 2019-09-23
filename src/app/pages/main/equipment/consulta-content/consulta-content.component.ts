import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';

@Component({
  selector: 'app-consulta-content',
  templateUrl: './consulta-content.component.html',
  styleUrls: ['./consulta-content.component.scss']
})
export class ConsultaContentComponent implements OnInit {
  ResultadosEmpresas : JSON[];

  constructor(private DataRetriever: DataRetrieverService) { }

  secondaryNavItems = [
    {title: 'Busqueda', link: 'busqueda'},
    {title: '+ Equipo', link: 'nuevoEquipo'}
  ]

  
  
  ngOnInit() {
  
  }
  
}
