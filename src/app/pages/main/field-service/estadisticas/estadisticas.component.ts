import {
  Component,
  OnInit
} from '@angular/core';
import * as env from '../../../../../assets/js/variables';
import {
  HttpClient
} from '@angular/common/http';
import {
  DataRetrieverService
} from '../../services/data-retriever.service';
import {
  ChartOptions,
  ChartType,
  ChartDataSets
} from 'chart.js';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  labels;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  chartColors = [{
    backgroundColor: "#009999"
  }];
  porcentajesIndividuales;
  PIFinales;
  especialistas;
  asignacionesM;
  asignacionesA;
  fechaA = "";
  totalDiasVFD = 0;
  totalDiasBT = 0;
  totalDiasAUT = 0;
  totalDiasAOS = 0;
  totalDiasMOT = 0;
  porcentajeVFD = 0;
  porcentajeBT = 0;
  porcentajeAUT = 0;
  porcentajeAOS = 0;
  porcentajeMOT = 0;
  porcentajeTotal = 0;
  diasMaximosMes;
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) {}

  traerAsignacionesM(fecha: string) {
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getMonthAssignments/' + fecha).map(result => result).subscribe(data => {
        resolve(data);
      })
    })
  }

  traerAsignacionesA(fecha: string) {
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getYearAssignments/' + fecha).map(result => result).subscribe(data => {
        resolve(data);
      })
    })
  }

  selectType(evt, tipo) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tipo).style.display = "block";
    evt.currentTarget.className += " active";
  }

  datosGrupalesM() {
    var diasDelMes = new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();
    var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
    var countVFD, countBT, countAUT, countAOS, countMOT;
    console.log(this.asignacionesM);
    for (var i = 0; i < this.asignacionesM.length; i++) {
      var status = this.asignacionesM[i]['IdStatus'];
      var fechaInicio = this.asignacionesM[i]['FechaInicio'];
      var fechaFin = this.asignacionesM[i]['FechaFin'];
      switch (parseInt(this.asignacionesM[i]['tecnica'])) {
        case 1: {
          countVFD = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
              this.totalDiasVFD = this.totalDiasVFD + (parseInt(fechaFin.split("-")[2]));
            } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
              this.totalDiasVFD = this.totalDiasVFD + (diasDelMes - parseInt(fechaInicio.split("-")[2]));
            } else {
              this.totalDiasVFD = this.totalDiasVFD + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
            }
          }
          break;
        }
        case 2: {
          countBT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
              this.totalDiasBT = this.totalDiasBT + (parseInt(fechaFin.split("-")[2]));
            } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
              this.totalDiasBT = this.totalDiasBT + (diasDelMes - parseInt(fechaInicio.split("-")[2]));
            } else {
              this.totalDiasBT = this.totalDiasBT + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
            }
          }
          break;
        }
        case 3: {
          countAUT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
              this.totalDiasAUT = this.totalDiasAUT + (parseInt(fechaFin.split("-")[2]));
            } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
              this.totalDiasAUT = this.totalDiasAUT + (diasDelMes - parseInt(fechaInicio.split("-")[2]));
            } else {
              this.totalDiasAUT = this.totalDiasAUT + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
            }
          }
          break;
        }
        case 4: {
          countAOS = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
              this.totalDiasAOS = this.totalDiasAOS + (parseInt(fechaFin.split("-")[2]));
            } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
              this.totalDiasAOS = this.totalDiasAOS + (diasDelMes - parseInt(fechaInicio.split("-")[2]));
            } else {
              this.totalDiasAOS = this.totalDiasAOS + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
            }
          }
          break;
        }
        case 5: {
          countMOT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
              this.totalDiasMOT = this.totalDiasMOT + (parseInt(fechaFin.split("-")[2]));
            } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
              this.totalDiasMOT = this.totalDiasMOT + (diasDelMes - parseInt(fechaInicio.split("-")[2]));
            } else {
              this.totalDiasMOT = this.totalDiasMOT + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
            }
          }
          break;
        }
      }
    }
    this.porcentajeVFD = (this.totalDiasVFD / (diasDelMes * countVFD)) * 100;
    if (isNaN(this.porcentajeVFD))
      this.porcentajeVFD = 0;
    this.porcentajeBT = (this.totalDiasBT / (diasDelMes * countBT)) * 100;
    if (isNaN(this.porcentajeBT))
      this.porcentajeBT = 0;
    this.porcentajeAUT = (this.totalDiasAUT / (diasDelMes * countAUT)) * 100;
    if (isNaN(this.porcentajeAUT))
      this.porcentajeAUT = 0;
    this.porcentajeAOS = (this.totalDiasAOS / (diasDelMes * countAOS)) * 100;
    if (isNaN(this.porcentajeAOS))
      this.porcentajeAOS = 0;
    this.porcentajeMOT = (this.totalDiasMOT / (diasDelMes * countMOT)) * 100;
    if (isNaN(this.porcentajeMOT))
      this.porcentajeMOT = 0;
    this.porcentajeTotal = (this.porcentajeVFD + this.porcentajeBT + this.porcentajeAUT + this.porcentajeAOS + this.porcentajeMOT) / 5;
  }

  datosIndividualesM() {
    var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
    var diasDelMes = new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();
    this.labels = [];
    for (var i = 0; i < this.especialistas.length; i++) {
      this.labels.push(this.especialistas[i]['NombreE']);
    }
    this.porcentajesIndividuales = [];
    for (var i = 0; i < this.asignacionesM.length; i++) {
      if (this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] == null) {
        this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] = 0;
      }
      var status = this.asignacionesM[i]['IdStatus'];
      var fechaInicio = this.asignacionesM[i]['FechaInicio'];
      var fechaFin = this.asignacionesM[i]['FechaFin'];
      if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5) {
        if (mesSeleccionado > parseInt(fechaInicio.split("-")[1])) {
          this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2].split("T")[0])) + 1;
        } else if (mesSeleccionado < parseInt(fechaFin.split("-")[1])) {
          this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("-")[2].split("T")[0])) + 1;
        } else {
          this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2].split("T")[0]) - parseInt(fechaInicio.split("-")[2].split("T")[0])) + 1;
        }
      }
    }
    this.porcentajesIndividuales = this.porcentajesIndividuales.filter((nuevo) => {
      return nuevo != null;
    });
    for (var i = 0; i < this.porcentajesIndividuales.length; i++) {
      this.porcentajesIndividuales[i] = (parseInt(this.porcentajesIndividuales[i]) / diasDelMes) * 100;
    }
    this.PIFinales = [{
      'data': this.porcentajesIndividuales,
      'label': 'Ocupacion (%)'
    }];
  }

  datosGrupalesA(){

  }

  datosIndividualesA(){

  }

  ngOnInit() {
    this.DataRetriever.infoFecha.subscribe(infoFecha => {
      this.fechaA = infoFecha;
      this.traerAsignacionesM(this.fechaA).then(data => {
        this.asignacionesM = data;
        this.traerAsignacionesA(this.fechaA).then(data => {
          this.asignacionesA = data;
          this.DataRetriever.getData(env.url + "/api/allWorkers").then(especialistas => {
            this.especialistas = especialistas;
            console.log(this.especialistas);
            this.datosGrupalesM();
            this.datosIndividualesM();
            this.datosGrupalesA();
            this.datosIndividualesA();
          })
       });
      });
    });

  }

}
