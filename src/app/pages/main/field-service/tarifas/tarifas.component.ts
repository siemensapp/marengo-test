import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../../../../assets/js/variables';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import {DataRetrieverService} from '../../services/data-retriever.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})


export class TarifasComponent implements OnInit {
constructor(private httpService: HttpClient, private router: Router, private DataRetriever: DataRetrieverService) { }

ResultadosTecnicas : JSON[];


editarTarifas(){
  //para poner funcionalidad del boton de editar tarifa
  var datos1 = document.forms["formulario"].elements[0].value;
  var datos2 = document.forms["formulario"].elements[1].value;
  var datos3 = document.forms["formulario"].elements[2].value;
  
  var datos = {
      "NombreT": datos1,
      "CostoServicio": datos2,
      "CostoViaje": datos3
  };
  console.log(datos);

  if(datos1 == ""){
    Swal.fire(
      'Debe indicar la tecnica a editar',
      'Elija del menù la tecnica',
      'warning'
    )
  }else if(datos2 == "" && datos3 == ""){
    Swal.fire(
      'Debe ingresar costo viaje o costo servicio para modificar',
      'Ingrese un valor para modificar',
      'warning'
    )
  }else{
    this.httpService.post(env.url+'/api/editTarifas', datos).toPromise()
                  .then((res) => {
                    console.log(res);
                    if(res == "true"){
                      Swal.fire(
                      'Tarifa editada',
                      datos1,
                      'success'
                      )
                      this.router.navigate(['/main/field-service']);
                  }
                  else if(res == "false"){
                    Swal.fire(
                      'Error al editar tarifas',
                      'Se ha presentado un error interno en servidor',
                      'error'
                    )  
                  }
                  });
  }

  
}

  ngOnInit() {
    this.DataRetriever.getData(env.url + '/api/getTarifas').then(data => {
      this.ResultadosTecnicas = data as JSON[];
    })
  }

}
