import { Component, OnInit } from '@angular/core';
import * as env from '../../../../../assets/js/variables';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-asignaciones-eliminadas',
  templateUrl: './asignaciones-eliminadas.component.html',
  styleUrls: ['./asignaciones-eliminadas.component.scss']
})
export class AsignacionesEliminadasComponent implements OnInit {

  constructor(private dataRetriever : DataRetrieverService) { }

  resultados: JSON[];

  agregarListener(){
    document.getElementById('fecha').addEventListener("change", (event) => {
      var fecha = (<HTMLInputElement>document.getElementById('fecha').attributes[2].ownerDocument.activeElement).value;
      var texto = (<HTMLInputElement>document.getElementById('buscar').attributes[2].ownerElement).value;
      if(isUndefined(fecha)){
        fecha = "'null'";
      }
      if(texto == ''){
        texto = "'null'";
      }
      //console.log(fecha, texto);
      this.dataRetriever.getData(env.url+'/api/getDeletedAssignments/'+fecha+'/'+texto).then(data => {
        this.resultados = data as JSON[];
        })  

    });

    document.getElementById('buscar').addEventListener("change", (event) => {
    
      var fecha = (<HTMLInputElement>document.getElementById('fecha').attributes[2].ownerElement).value;
      var texto = (<HTMLInputElement>document.getElementById('buscar').attributes[2].ownerElement).value;
      if(fecha == ''){
        fecha = "'null'";
      }
      if(texto == ''){
        texto = "'null'";
      }
      this.dataRetriever.getData(env.url+'/api/getDeletedAssignments/'+fecha+'/'+texto).then(data => {
        this.resultados = data as JSON[];
        })
    });

  }
  traerAsignacionesEliminadas(){
    this.dataRetriever.getData(env.url+"/api/getDeletedAssignments/'null'/'null'").then(data => {
      this.resultados = data as JSON[];
      })
  }
  ngOnInit() {
       this.traerAsignacionesEliminadas();
       this.agregarListener();
  }

}