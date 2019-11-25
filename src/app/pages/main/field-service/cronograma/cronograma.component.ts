import {Component,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../../../../assets/js/variables';
import Swal from 'sweetalert2';
import 'rxjs/add/operator/map';
import {DataRetrieverService} from '../../services/data-retriever.service';
import * as jsPDF from 'jspdf';
import {ExcelService} from '../../../../shared/excel.service';
import * as auxExcel from '../../../../../assets/js/createExcel';
import * as pdf from '../../../../../assets/js/createReportPdf';
import { worker } from 'cluster';
import { Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss']
})


export class CronogramaComponent implements OnInit {

  constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService, private excelService: ExcelService, private router: Router) {}
  private holidays = require('colombia-holidays');
  festivos = {};
  Asignaciones;
  resultados;
  datos: JSON[];
  infoAsignacion: {};
  infoAsignacion2: {};
  infoReporte: {};

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  traerNumeroEspecialistas() {
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/allWorkers').map(result => result).subscribe(especialistas => {
        resolve(especialistas);
      })
    })
  }

  traerAsignaciones(fecha: string) {
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getAssignments/' + fecha).map(result => result).subscribe(data => {
        resolve(data);
        //console.log(data);
      })
    })
  }


  menuAsignacion(columna, fila, estiloCelda) {
    if (estiloCelda.style.backgroundColor !== "") {
      var idEspecialista = < HTMLTableElement > document.getElementById('tablaEspecialistas1');
      var IdEspecialista = idEspecialista.rows[fila].id;
      var Fecha = < HTMLInputElement > document.getElementById('fecha');
      var fecha = Fecha.value + "-" + columna;
      var urlData = env.url + '/api/getInfoAssignment/' + IdEspecialista + '/' + fecha;
      this.dataRetriever.getData(urlData).then(data => {
        this.infoAsignacion = data as JSON;
      })
      Swal.fire({
        title: "Asignacion",
        html: '<hr>'+
              '<h5> <strong> Nombre Empresa </strong></h5>'+
              '<h5>'+this.infoAsignacion[0]['NombreEmpresa']+'</h5>'+
              '<hr>'+
              '<h5> <strong> Nombre Planta </strong></h5>'+
              '<h5>'+this.infoAsignacion[0]['NombrePlanta']+'</h5>'+
              '<hr>'+
              '<h5><strong> Ciudad Planta </strong> </h5>'+
              '<h5>'+this.infoAsignacion[0]['CiudadPlanta']+'</h5>',
              
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "red",
        confirmButtonText: "VER MAS INFORMACION",
        cancelButtonText: "ELIMINAR",
        
      }).then((result) => {
        if (result.value) {
          var idEspecialista = < HTMLTableElement > document.getElementById('tablaEspecialistas1');
          var IdEspecialista = idEspecialista.rows[fila].id;
          var Fecha = < HTMLInputElement > document.getElementById('fecha');
          var fecha = Fecha.value + "-" + columna;
          var url = env.url + '/api/getInfoAssignment/' + IdEspecialista + '/' + fecha;
          //console.log("GET INFO ASSIGMENT: ", url);
          this.dataRetriever.getData(url).then(data => {
            this.infoAsignacion = data as JSON;
            //console.log("JSON DATA", data);
            var id = this.infoAsignacion[0]['IdAsignacion'];
            //console.log("ID ASSIGNACION: ",id);
            var url2 = env.url + '/api/getReportByAssignment/' + id;
            this.dataRetriever.getData(url2).then(reportData => {
              this.infoReporte = reportData as JSON;
              var status;
              if (this.infoAsignacion[0]['StatusAsignacion'] == 0) {
                status = "Asignado - No Aceptado";
              }
              else if (this.infoAsignacion[0]['StatusAsignacion'] == 1) {
                status = "Asignación Aceptada";
              } else if (this.infoAsignacion[0]['StatusAsignacion'] == 2) {
                status = "Asignación Iniciada";
              } else if(this.infoAsignacion[0]['StatusAsignacion'] == 3) {
                status = "Asignación Terminada";
              } else if(this.infoAsignacion[0]['StatusAsignacion'] == 4) {
                status = "Asignación Rechazada";
              } 
              if(this.infoAsignacion[0]['IdStatus']==1){
              var contenido = this.infoAsignacion[0]['NombreE'] + ' (' + this.infoAsignacion[0]['NombreT'] + ') - ' + this.infoAsignacion[0]['NombreS'] + '<br>' +
                this.infoAsignacion[0]['NombreSitio'] + '<br><br>' +
                this.infoAsignacion[0]['FechaInicio'].split("T")[0] + '  <i class="fas fa-long-arrow-alt-right"></i>  ' + this.infoAsignacion[0]['FechaFin'].split("T")[0] + '<br>' +
                '<p style="font-weight: bold; text-decoration: underline;">' + status + '</p>' + '<br>' +
                'Contacto: ' + this.infoAsignacion[0]['NombreContacto'] + '<br>Teléfono: ' + this.infoAsignacion[0]['TelefonoContacto'];
              }
              else{
                var contenido = this.infoAsignacion[0]['NombreE'] + ' (' + this.infoAsignacion[0]['NombreT'] + ') - ' + this.infoAsignacion[0]['NombreS'] + '<br>' +
                this.infoAsignacion[0]['FechaInicio'].split("T")[0] + '  <i class="fas fa-long-arrow-alt-right"></i>  ' + this.infoAsignacion[0]['FechaFin'].split("T")[0] + '<br>';  
              }
              if (reportData == 'false') {
                let idAsignacion = id;
                Swal.fire({
                  title: 'Informacion Asignacion',
                  html: contenido,
                  confirmButtonText: "EDITAR",
                  confirmButtonColor: "green",
                  showCancelButton: true,
                  cancelButtonText: "SALIR",
                  allowOutsideClick: false,
                  cancelButtonColor: "gray"
                }).then((result => {
                  if(String(result.dismiss) != 'cancel'){//como el cancel button es editar, aca va lo que entra al dar clic en editar
                    //console.log("ID ASIGNACION",idAsignacion);
                    this.router.navigateByUrl("/main/field-service/edit-asignacion/"+idAsignacion);
                  }else{
                    //console.log("SALIDA POR CANCEL");
                    /*opcion else para salir por dar clic en cancel en ventana popup de editar*/
                  }
                }))
              
              } else {
                Swal.fire({
                  title: 'Informacion Asignacion',
                  html: contenido,
                  showCloseButton: true,
                  showCancelButton: true,
                  confirmButtonText: "MIRAR REPORTE",
                  cancelButtonText: "SALIR"
                }).then((result => {
                  if (result.value) {
                    pdf.createPDF(this.infoReporte[0]);
                    this.excelService.exportAsExcelFile(String(this.infoReporte[0]['Consecutivo'] + '-Liquidacion'), JSON.parse(this.infoReporte[0]['HojaTiempo']), this.infoReporte[0]['CostoServicio'], this.infoReporte[0]['CostoViaje']);
                  }
                  if(result.value){
                    this.excelService.exportAsExcelFile(String(this.infoReporte[0]['Consecutivo'] + '-Liquidacion'), JSON.parse(this.infoReporte[0]['HojaTiempo']), this.infoReporte[0]['CostoServicio'], this.infoReporte[0]['CostoViaje']);
                  
                  }
                }))
              }

            })
          })


        } else if (String(result.dismiss) == "cancel") {
          var idEspecialista = < HTMLTableElement > document.getElementById('tablaEspecialistas1');
          var IdEspecialista = idEspecialista.rows[fila].id;
          var Fecha = < HTMLInputElement > document.getElementById('fecha');
          var fecha = Fecha.value + "-" + columna;
          this.dataRetriever.getData(env.url + '/api/getInfoAssignment/' + IdEspecialista + '/' + fecha).then(data => {
            this.infoAsignacion2 = data as JSON;
            //console.log("LO QUE DA INFO2:", this.infoAsignacion2);
            //console.log(this.infoAsignacion2);
            Swal.fire({
              type: "warning",
              title: "Seguro desea borrar esta asignacion?",
              html: '<p style="font-family: Verdana, Geneva, Tahoma, sans-serif;">LLenar los siguientes campos</p>' +
                'Desde <input id="desde" type="date" min="' + this.infoAsignacion2[0]['FechaInicio'].split("T")[0] + '" max="' + this.infoAsignacion2[0]['FechaFin'].split("T")[0] + '"><br><br>Hasta <input id="hasta" type="date" min="' + this.infoAsignacion2[0]['FechaInicio'].split("T")[0] + '" max="' + this.infoAsignacion2[0]['FechaFin'].split("T")[0] + '">' +
                '<input id="input1" maxlength="60" placeholder="Sujeto/Entidad Cancelando el Servicio" style="height: 35px; width:80%; margin-top:5%;font-family: Verdana, Geneva, Tahoma, sans-serif; font-size:16px;"><br>' +
                '<textarea id="input2" maxlength="255" placeholder="Razón Cancelación del Servicio" autocomplete="off" style="height: 60px; width:80%; margin-top:5%;font-family: Verdana, Geneva, Tahoma, sans-serif;"></textarea>',
              showCloseButton: true,
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "BORRAR",
              cancelButtonColor: "gray",
              cancelButtonText: "CANCELAR"
            }).then((result1) => {
              if (result1.value) {
                var sc = < HTMLInputElement > document.getElementById('input1');
                var SC = sc.value;
                var rc = < HTMLInputElement > document.getElementById('input2');
                var RC = rc.value;
                var desde = < HTMLInputElement > document.getElementById('desde');
                var Desde = desde.value;
                var hasta = < HTMLInputElement > document.getElementById('hasta');
                var Hasta = hasta.value;
                var datos = {
                  'IdEspecialista': this.infoAsignacion2[0]['IdEspecialista'],
                  'IdStatus': this.infoAsignacion2[0]['IdStatus'],
                  'IdEmpresa': this.infoAsignacion2[0]['IdEmpresa'],
                  'PCFSV': this.infoAsignacion2[0]['PCFSV'],
                  'IdAsignacion': this.infoAsignacion2[0]['IdAsignacion'],
                  'NombreEmpresa': this.infoAsignacion2[0]['NombreEmpresa'],
                  'NombrePlanta': this.infoAsignacion2[0]['NombrePlanta'],
                  'CiudadPlanta': this.infoAsignacion2[0]['CiudadPlanta'],
                  'FechaInicio': this.infoAsignacion2[0]['FechaInicio'].split("T")[0],
                  'FechaFin': this.infoAsignacion2[0]['FechaFin'].split("T")[0],
                  'CoordenadasSitio': this.infoAsignacion2[0]['CoordenadasSitio'],
                  'CoordenadasEspecialista': this.infoAsignacion2[0]['CoordenadasEspecialista'],
                  'NombreSitio': this.infoAsignacion2[0]['NombreSitio'],
                  'NombreContacto': this.infoAsignacion2[0]['NombreContacto'],
                  'TelefonoContacto': this.infoAsignacion2[0]['TelefonoContacto'],
                  'Descripcion': this.infoAsignacion2[0]['Descripcion'],
                  'EmailContacto': this.infoAsignacion2[0]['EmailContacto'],
                  'SujetoCancelacion': SC,
                  'RazonCancelacion': RC,
                  'fecha': fecha,
                  'Desde': Desde,
                  'Hasta': Hasta
                };
                var url = env.url + '/api/deleteAssignment';
                var urlMailDel = env.url + '/api/sendMailDelete';
                //console.log("NOMBRE CLIENTE",datos);
                this.httpService.post(url, datos).toPromise()
                  .then((res) => {
                    //console.log(res);
                    if (res == "true") {
                      Swal.fire(
                        'Asignacion Borrada',
                        '',
                        'success'
                      ).then(() => location.reload())
                      this.httpService.post(urlMailDel, datos).toPromise().then((res) => {
                        if(res == "true"){
                          //console.log("delete mail sent");
                        }else{
                          //console.log("erro sending delete mail");
                        }
                      })
                    } else {
                      Swal.fire(
                        'Error al borrar asignacion',
                        'No se pudo completar la accion',
                        'error'
                      )
                    }
                  })
              }
            });
          });
        }
      });
    } else {
      //console.log("No existe ninguna asignacion en esta fecha");
    }
  }



  setColor(option: number) {
    switch (option) {
      case 1:
        return '#FF7115';
      case 2:
        return '#008DFF';
      case 3:
        return '#FFE300';
      case 4:
        return 'white';
      case 5:
        return '#BB0000';
      case 6:
        return '#5B00BB';
      case 7:
        return '#8B8B8B';
      case 8:
        return '#06AA00';
    }
  }

  setFecha(fechaN: string) {
    this.dataRetriever.obtenerFecha(fechaN);
  }

  ngOnInit() {
    
    //Obtener las asignaciones del mes y año de la fecha de HOY 
    var fechaH = new Date();
    var fechaHoy = fechaH.toISOString();
    var fechaHoyMA = fechaHoy.split("-")[0] + "-" + fechaHoy.split("-")[1];
    var diasDelMes = new Date(parseInt(fechaHoy.split("-")[0]), parseInt(fechaHoy.split("-")[1]), 0).getDate();
    this.setFecha(fechaHoyMA + "-" + "01");
    var tabla = < HTMLTableElement > document.getElementById("tablaAsignacionesID");

    tabla.addEventListener("click", (event: any) => {
      var columna = ( < HTMLTableDataCellElement > event.target.attributes[0].ownerElement).cellIndex + 1;
      //console.log(columna);
      var fila = ( < HTMLTableRowElement > event.target.attributes[0].ownerElement.parentNode).rowIndex;
      var estiloCelda = ( < HTMLTableCellElement > event.target).attributes[0].ownerElement;
      this.menuAsignacion(columna, fila, estiloCelda);
    });

    var header = tabla.createTHead();
    var row = header.insertRow(0);
    var diaSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    row.style.fontSize = "1.1em";
    let auxFestivos = this.holidays.getColombiaHolidaysByYear(parseInt(fechaHoy.split("-")[0]));
    
    for (let festivos of auxFestivos) this.festivos[festivos['holiday']] = "";
    
    for (var i = 0; i < diasDelMes; i++) {
      var dia = diaSemana[new Date(parseInt(fechaHoy.split("-")[0]), parseInt(fechaHoy.split("-")[1])-1, i+1).getDay()];
      var cell = row.insertCell(i);
      var diaFestivo = String(fechaHoy.split("-")[0] +'-'+fechaHoy.split("-")[1]+ '-' + (i + 1 < 10 ? '0' + (i + 1): (i + 1)));
      
      if(dia=="Do" || dia=="Sa" || this.festivos.hasOwnProperty(diaFestivo)){
        cell.style.color = 'red';
      }
      if (i < 9) {
        cell.innerHTML = dia + "<br><b>" + "0" + (i + 1) + "</b>";
      } else {
        cell.innerHTML = dia + "<br><b>" + (i + 1) + "</b>";  
      }
    }
    
    document.getElementById('fecha').setAttribute('value', fechaHoyMA);

    //Llenar la primera tabla con los nombres de todos los Field Service
    //rows[i].rowIndex(Indice de la fila) e textContent(Nombre del especialista). className(IdEspecialista)
    var tableA;
    var fila;
    var celda;


    this.traerNumeroEspecialistas().then(especialistas => {
      this.resultados = especialistas;
      this.traerAsignaciones(fechaHoyMA + "-" + "01").then(data => {
        this.Asignaciones = data;
        for (var i = 0; i < this.resultados.length; i++) {
          tableA = document.getElementById("tablaAsignacionesID");
          fila = tableA.insertRow(i + 1);
          fila.style.borderTop = "1px ridge gray";
          for (var j = 0; j < diasDelMes; j++) {
            celda = fila.insertCell(j);
            celda.style.height = "1.3em";
          }
        }

        var x;
        for (var i = 0; i < this.Asignaciones.length; i++) {
          var fechaI = new Date(this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[0], this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[1],this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[2]);
          var fechaF = new Date(this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[0], this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[1],this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[2]);
          var ids = ( < HTMLTableRowElement > document.getElementById(this.Asignaciones[i]['IdEspecialista'])).rowIndex;
          x = tableA.rows[ids].cells;
          var counterCell = (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));
          
          if (fechaI.getMonth() == fechaF.getMonth() && fechaI.getFullYear() == fechaF.getFullYear()) {
            for (var j = (parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2]) - 1); j < (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2])); j++) {
              x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
              x[j].style.borderTop = 'solid';
              x[j].style.borderBottom = 'solid';
            }
            x[counterCell - 1].style.borderRight = 'solid';
            
          } else {
            var añosDifIH = fechaI.getFullYear()-fechaH.getFullYear();
            var mesesDifIH = (fechaI.getMonth()-fechaH.getMonth())+(12*añosDifIH);
            var añosDifFH = fechaF.getFullYear()-fechaH.getFullYear();
            var mesesDifFH = (fechaF.getMonth()-fechaH.getMonth())+(12*añosDifFH);
            
            if (mesesDifIH<0 && mesesDifFH ==0) {
              var counterCell = (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));
              for (var j = 0; j < (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2])); j++) {
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                x[j].style.borderTop = 'solid';
                x[j].style.borderBottom = 'solid';
              }
              x[counterCell - 1].style.borderRight = 'solid';

            } else if (mesesDifFH>0 && mesesDifIH == 0) {
              var counterCell = diasDelMes;
              
              for (var j = (parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2]) - 1); j < diasDelMes; j++) {
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                x[j].style.borderTop = 'solid';
                x[j].style.borderBottom = 'solid';
              }
              x[counterCell - 1].style.borderRight = 'solid';

            } else if (mesesDifIH<0 && mesesDifFH>0) {
              var counterCell = diasDelMes;
              
              for (var j = 0; j < diasDelMes; j++) {
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                x[j].style.borderTop = 'solid';
                x[j].style.borderBottom = 'solid';
              }
              x[counterCell - 1].style.borderRight = 'solid';
            }

          }

        }
      });
    });


    //Crear un EventListener en el Seleccionador de fecha. Siempre que cambia, cambia la tabla
    document.getElementById('fecha').addEventListener("change", (event) => {
      var fecha = ( < HTMLInputElement > event.target).value;
      var diasDelMesN = new Date(parseInt(fecha.split("-")[0]), parseInt(fecha.split("-")[1]), 0).getDate();
      //console.log(diasDelMesN);
      this.setFecha(fecha + "-" + "01");
      var tabla = < HTMLTableElement > document.getElementById("tablaAsignacionesID");
      tabla.deleteRow(0);
      var header = tabla.createTHead();
      var row = header.insertRow(0);
      var diaSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
      row.style.fontSize = "1.1em";
      
      for (let festivos of auxFestivos) this.festivos[festivos['holiday']] = "";
      
      for (var i = 0; i < diasDelMesN; i++) {
        var dia = diaSemana[new Date(parseInt(fecha.split("-")[0]), parseInt(fecha.split("-")[1])-1, i+1).getDay()];
        var cell = row.insertCell(i);
        var diaFestivo = String(fecha.split("-")[0] +'-'+fecha.split("-")[1]+ '-' + (i + 1 < 10 ? '0' + (i + 1): (i + 1)));
        
        if(dia=="Do" || dia=="Sa" || this.festivos.hasOwnProperty(diaFestivo)){
          cell.style.color = 'red';
        }
        
        if (i < 9) {
          cell.innerHTML = dia +"<br><b>" + "0" + (i + 1) + "</b>";
        } else {
          cell.innerHTML = dia +"<br><b>" + (i + 1) + "</b>";
        }
      }

      var tableA;
      var fila;
      var celda;

      this.traerNumeroEspecialistas().then(especialistas => {
        this.resultados = especialistas;
        this.traerAsignaciones(fecha + "-" + "01").then(data => {
          this.Asignaciones = data;
          fecha = fecha + '-01';
          var fechaNueva = new Date(parseInt(fecha.split("-")[0]), parseInt(fecha.split("-")[1]), parseInt(fecha.split("-")[2]));
          tableA = document.getElementById("tablaAsignacionesID");
          for (var i = this.resultados.length; i > 1; i--) {
            fila = tableA.deleteRow(i);
          }
          tableA.deleteRow(1);
          for (let i = 0; i < this.resultados.length; i++) {
            tableA = document.getElementById("tablaAsignacionesID");
            fila = tableA.insertRow(i + 1);
            fila.style.borderTop = "1px ridge gray";
            for (var j = 0; j < diasDelMesN; j++) {
              celda = fila.insertCell(j);
              celda.style.height = "1.3em";
              }
          }

          var x;
          for (let i = 0; i < this.Asignaciones.length; i++) {
            var fechaI = new Date(this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[0], this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[1],this.Asignaciones[i]['FechaInicio'].split("T")[0].split("-")[2]);
            var fechaF = new Date(this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[0], this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[1],this.Asignaciones[i]['FechaFin'].split("T")[0].split("-")[2]);
            var ids = ( < HTMLTableRowElement > document.getElementById(this.Asignaciones[i]['IdEspecialista'])).rowIndex;
            x = tableA.rows[ids].cells;
            if (fechaI.getMonth() == fechaF.getMonth() && fechaI.getFullYear() == fechaF.getFullYear()) {
              var counterCell = (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));
              for (var j = (parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2]) - 1); j < (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2])); j++) {
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                x[j].style.borderTop = 'solid';
                x[j].style.borderBottom = 'solid';
              }
              x[counterCell - 1].style.borderRight = 'solid';

            } else {
              var añosDifIN = fechaI.getFullYear()-fechaNueva.getFullYear();
              var mesesDifIN = (fechaI.getMonth()-fechaNueva.getMonth())+(12*añosDifIN);
              var añosDifFN = fechaF.getFullYear()-fechaNueva.getFullYear();
              var mesesDifFN = (fechaF.getMonth()-fechaNueva.getMonth())+(12*añosDifFN);
              if (mesesDifIN<0 && mesesDifFN ==0) {
                var counterCell = (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));
                for (var j = 0; j < (parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2])); j++) {
                  x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                  x[j].style.borderTop = 'solid';
                  x[j].style.borderBottom = 'solid';
                }
                x[counterCell - 1].style.borderRight = 'solid';

              } else if (mesesDifFN>0 && mesesDifIN == 0) {
                var counterCell = diasDelMesN;
                for (var j = (parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2]) - 1); j < diasDelMesN; j++) {
                  //console.log(j);
                  x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                  x[j].style.borderTop = 'solid';
                  x[j].style.borderBottom = 'solid';
                }
                x[counterCell - 1].style.borderRight = 'solid';

              } else if (mesesDifIN<0 && mesesDifFN>0) {
                var counterCell = diasDelMesN;
                for (var j = 0; j < diasDelMesN; j++) {
                  x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                  x[j].style.borderTop = 'solid';
                  x[j].style.borderBottom = 'solid';
                }
                x[counterCell - 1].style.borderRight = 'solid';
              }
            }

          }
        });
      });


    });
    
  }

}
