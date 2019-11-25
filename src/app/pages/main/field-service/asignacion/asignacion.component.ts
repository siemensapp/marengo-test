import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataRetrieverService} from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements OnInit {

    finalCoords = [];
    infoUbicacion = "";
    infoCiudad = "";
    clientCode = null;
    fechaMinima;


  enviarDatos(){
    var datos1 = document.forms["formulario"].elements[0].value;
    var datos2 = document.forms["formulario"].elements[1].value;
    var datos3 = document.forms["formulario"].elements[2].value;
    var datos4 = document.forms["formulario"].elements[3].value;
    var datos5 = document.forms["formulario"].elements[4].value;
    var datos6 = document.forms["formulario"].elements[5].value;
    var datos7 = document.forms["formulario"].elements[6].value;
    var datos8 = document.forms["formulario"].elements[7].value;
    var datos9 = document.forms["formulario"].elements[8].value;
    var datos10 = document.forms["formulario"].elements[9].value;
    var datos11 = document.forms["formulario"].elements[10].value;
    var datos12 = document.forms["formulario"].elements[11].value;

    //console.log(datos5);

    var datos = {"IdEspecialista" : datos3,
                 "IdStatus" : datos4,
                 "NombreCliente" : datos1,
                 "NombrePlanta" : datos2, 
                 "CiudadPlanta" : this.finalCoords[2],
                 "PCFSV": datos5,
                 "FechaInicio" : datos6,
                 "FechaFin" : datos7,
                 "CoordenadasSitio" : this.finalCoords[0],
                 "NombreSitio" : this.infoUbicacion.split(",")[2],
                 "NombreContacto" : datos8,
                 "TelefonoContacto" : datos9,
                 "EmailContacto" : datos10,
                 "Descripcion" : datos11,
                };
    //console.log(datos);
    if(this.infoUbicacion == ""){
      Swal.fire(
        'Debe elegir una ubicación para la asignación',
        'Indique una ubicación en el mapa',
        'warning'
      )  
    }
    else if(datos1 == "" || datos2==""){
      Swal.fire(
        'Debe indicar el cliente y la planta',
        'Elija el cliente al cual se le brindará el servicio',
        'warning'
      )  
    }
    else if(datos6 == "" || datos7 == ""){
      Swal.fire(
        'Debe indicar las fechas de la asignación',
        'Verifique que tanto la fecha de inicio como la fecha de fin estén especificadas',
        'warning'
      )  
    }
    else if(datos10==""){
      Swal.fire(
        'Información de contacto incompleta',
        'Debe indicar por lo menos el Email del contacto',
        'warning'
      )  
    }
    else{
      this.httpService.post(env.url+'/api/setAssignment', datos).toPromise()
                  .then((res) => {
                    //console.log(res);
                    if(res == "true"){
                      Swal.fire(
                      'Asignacion Creada',
                      this.infoUbicacion.split(",")[2],
                      'success'
                      )
                      this.router.navigate(['/main/field-service']);
                  }
                  else if(res == "existe"){
                    Swal.fire(
                      'Error Creando Asignacion',
                      'Otra asignacion para este especialista ya existe en esas fechas. Verifique el cronograma',
                      'error'
                    )  
                  }
                  else{
                    Swal.fire(
                      'Error Creando Asignacion',
                      'Hubo un error creando la asignacion',
                      'error'
                    ) 
                  }
                  });
     this.httpService.post(env.url+'/api/sendMail',datos).toPromise()
                  .then((res) => {
                      if(res == "true"){
                        //console.log("mail sent");
                      }else{
                        //console.log("error mailing");
                      }
                  });
    }
  }
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService, private router: Router) { }
  ResultadosEmpresas : JSON[];
  ResultadosField : JSON[];
  ResultadosStatus: JSON[];
  ResultadosPM: JSON[];

  ngOnInit() {
    document.getElementById('fechaI').addEventListener("change", (event) => {
      this.fechaMinima = (<HTMLDataElement>document.getElementById('fechaI')).value;
    });
    this.DataRetriever.infoUbicacion.subscribe(infoUbicacion => this.infoUbicacion = infoUbicacion);
    this.DataRetriever.finalCoords.subscribe(finalCoords => {this.finalCoords = finalCoords
      var nombreS = document.getElementById('ubicacion').textContent;
      if(nombreS == ''){
        //console.log(nombreS);
        document.getElementById('ubicacion').textContent = '*Buscar Ubicacion en el Mapa*';
      }
      else
      document.getElementById('ubicacion').textContent = this.finalCoords[1] + ', '+ this.finalCoords[2];
    });
    // var fechaHoy=new Date();
    // document.getElementById("fechaI").setAttribute("value", String(fechaHoy.getFullYear()+"-0"+(fechaHoy.getMonth()+1)+"-"+fechaHoy.getDate()));
      this.DataRetriever.getData(env.url+'/api/allWorkers').then(data => {
      this.ResultadosField = data as JSON[];
      })

      this.DataRetriever.getData(env.url+'/api/PM').then(data => {
        this.ResultadosPM = data as JSON[];
        })

      this.DataRetriever.getData(env.url + '/api/clientList').then(data => {
        this.ResultadosEmpresas = data as JSON[];
        //console.log(this.ResultadosEmpresas);
      })

      /*this.DataRetriever.getData(env.url + '/api/statusList').then(data => {
        this.ResultadosStatus = data as JSON[];
        console.log(this.ResultadosStatus);
      })*/
    // this.httpService.get(env.url+'/api/workersList').subscribe(
    //   data => {
    //     this.ResultadosField = data as JSON[];
    //     console.log(this.ResultadosField);
    //   }
    // )
  }

}