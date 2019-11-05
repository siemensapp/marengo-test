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
  fechaA = "";
  especialistas;

  //Variables gráficos mensuales
  porcentajesIndividualesVFD;
  porcentajesIndividualesBT;
  porcentajesIndividualesAUT;
  porcentajesIndividualesAOS;
  porcentajesIndividualesMOT;
  PIFinales;
  asignacionesM;
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

  //Variables gráficos anuales
  asignacionesA;
  porcentajesIndividualesA;
  porcentajesIndividualesVFDA;
  porcentajesIndividualesBTA;
  porcentajesIndividualesAUTA;
  porcentajesIndividualesAOSA;
  porcentajesIndividualesMOTA;
  PIFinalesA;
  totalDiasVFDA = 0;
  totalDiasBTA = 0;
  totalDiasAUTA = 0;
  totalDiasAOSA = 0;
  totalDiasMOTA = 0;
  porcentajeVFDA = 0;
  porcentajeBTA = 0;
  porcentajeAUTA = 0;
  porcentajeAOSA = 0;
  porcentajeMOTA = 0;
  porcentajeTotalA = 0;


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
    for (var i = 0; i < this.asignacionesM.length; i++) {
      var status = this.asignacionesM[i]['IdStatus'];
      var fechaInicio = this.asignacionesM[i]['FechaInicio'];
      var fechaFin = this.asignacionesM[i]['FechaFin'];
      var añosDifFFMS = parseInt(fechaFin.split("T")[0].split("-")[0]) - parseInt(this.fechaA.split("-")[0]);
      var mesesDifFFMS = (parseInt(fechaFin.split("T")[0].split("-")[1]) - mesSeleccionado) + (12 * añosDifFFMS);
      var añosDifMSFI = parseInt(this.fechaA.split("-")[0]) - parseInt(fechaInicio.split("-")[0].split("-")[0]);
      var mesesDifMSFI = (mesSeleccionado - parseInt(fechaInicio.split("T")[0].split("-")[1])) + (12 * añosDifMSFI);
      switch (parseInt(this.asignacionesM[i]['tecnica'])) {
        case 1: {
          countVFD = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.totalDiasVFD = this.totalDiasVFD + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.totalDiasVFD = this.totalDiasVFD + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.totalDiasVFD = this.totalDiasVFD + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.totalDiasVFD = this.totalDiasVFD + diasDelMes;
            }
          }
          break;
        }
        case 2: {
          countBT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.totalDiasBT = this.totalDiasBT + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.totalDiasBT = this.totalDiasBT + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.totalDiasBT = this.totalDiasBT + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.totalDiasBT = this.totalDiasBT + diasDelMes;
            }
          }
          break;
        }
        case 3: {
          countAUT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.totalDiasAUT = this.totalDiasAUT + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.totalDiasAUT = this.totalDiasAUT + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.totalDiasAUT = this.totalDiasAUT + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.totalDiasAUT = this.totalDiasAUT + diasDelMes;
            }
          }
          break;
        }
        case 4: {
          countAOS = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.totalDiasAOS = this.totalDiasAOS + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.totalDiasAOS = this.totalDiasAOS + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.totalDiasAOS = this.totalDiasAOS + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.totalDiasAOS = this.totalDiasAOS + diasDelMes;
            }
          }
          break;
        }
        case 5: {
          countMOT = this.asignacionesM[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.totalDiasMOT = this.totalDiasMOT + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.totalDiasMOT = this.totalDiasMOT + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.totalDiasMOT = this.totalDiasMOT + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.totalDiasMOT = this.totalDiasMOT + diasDelMes;
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
    this.porcentajesIndividualesVFD = [];
    this.porcentajesIndividualesBT = [];
    this.porcentajesIndividualesAUT = [];
    this.porcentajesIndividualesAOS = [];
    this.porcentajesIndividualesMOT = [];

    for (var i = 0; i < this.especialistas.length; i++) {
      this.labels.push(this.especialistas[i]['NombreE']);
      if (this.especialistas[i]['IdTecnica'] == 1) {
        if (this.porcentajesIndividualesVFD[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesVFD[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 2) {
        if (this.porcentajesIndividualesBT[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesBT[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 3) {
        if (this.porcentajesIndividualesAUT[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesAUT[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 4) {
        if (this.porcentajesIndividualesAOS[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesAOS[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else {
        if (this.porcentajesIndividualesMOT[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesMOT[this.especialistas[i]['IdEspecialista']] = 0;
        }
      }
    }

    for (var i = 0; i < this.asignacionesM.length; i++) {
      var status = this.asignacionesM[i]['IdStatus'];
      var fechaInicio = this.asignacionesM[i]['FechaInicio'];
      var fechaFin = this.asignacionesM[i]['FechaFin'];
      var añosDifFFMS = parseInt(fechaFin.split("T")[0].split("-")[0]) - parseInt(this.fechaA.split("-")[0]);
      var mesesDifFFMS = (parseInt(fechaFin.split("T")[0].split("-")[1]) - mesSeleccionado) + (12 * añosDifFFMS);
      var añosDifMSFI = parseInt(this.fechaA.split("-")[0]) - parseInt(fechaInicio.split("-")[0].split("-")[0]);
      var mesesDifMSFI = (mesSeleccionado - parseInt(fechaInicio.split("T")[0].split("-")[1])) + (12 * añosDifMSFI);
      if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5) {
        switch (this.asignacionesM[i]['tecnica']) {
          case 1: {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesVFD[this.asignacionesM[i]['IdEspecialista']] + diasDelMes;
            }
            break;
          }
          case 2: {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesBT[this.asignacionesM[i]['IdEspecialista']] + diasDelMes;
            }
            break;
          }
          case 3: {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAUT[this.asignacionesM[i]['IdEspecialista']] + diasDelMes;
            }
            break;
          }
          case 4: {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesAOS[this.asignacionesM[i]['IdEspecialista']] + diasDelMes;
            }
            break;
          }
          case 5: {
            if (mesesDifMSFI > 0 && mesesDifFFMS == 0) {
              this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]));
            } else if (mesesDifMSFI == 0 && mesesDifFFMS > 0) {
              this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] + (diasDelMes - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else if (mesesDifFFMS == 0 && mesesDifMSFI == 0) {
              this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] + (parseInt(fechaFin.split("T")[0].split("-")[2]) - parseInt(fechaInicio.split("T")[0].split("-")[2])) + 1;
            } else {
              this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] = this.porcentajesIndividualesMOT[this.asignacionesM[i]['IdEspecialista']] + diasDelMes;
            }
            break;
          }
        }
      }
    }

    var primero = this.porcentajesIndividualesVFD.concat(this.porcentajesIndividualesBT);
    var segundo = primero.concat(this.porcentajesIndividualesAUT);
    var tercero = segundo.concat(this.porcentajesIndividualesAOS);
    var total = tercero.concat(this.porcentajesIndividualesMOT);
    total = total.filter((nuevo) => {
      return nuevo != null;
    });
    for (var i = 0; i < total.length; i++) {
      total[i] = (parseInt(total[i]) / diasDelMes) * 100;
    }
    this.PIFinales = [{
      'data': total,
      'label': 'Ocupacion (%)'
    }];
  }

  datosGrupalesA() {

    var inicioAño;
    var finAño;
    if (parseInt(this.fechaA.split("-")[1]) < 10) {
      inicioAño = new Date((parseInt(this.fechaA.split("-")[0]) - 1), 9, 1);
      finAño = new Date(parseInt(this.fechaA.split("-")[0]), 8, 30);
    } else {
      inicioAño = new Date(parseInt(this.fechaA.split("-")[0]), 9, 1);
      finAño = new Date((parseInt(this.fechaA.split("-")[0]) + 1), 8, 30);
    }
    var diasDelAño = 365;
    var countVFD, countBT, countAUT, countAOS, countMOT;
    for (let i = 0; i < this.asignacionesA.length; i++) {
      var status = this.asignacionesA[i]['IdStatus'];
      var fechaInicio = this.asignacionesA[i]['FechaInicio'].split("T")[0];
      var fechaFin = this.asignacionesA[i]['FechaFin'].split("T")[0];
      var añosDifFFIA = parseInt(fechaFin.split("-")[0]) - inicioAño.getFullYear();
      var mesesDifFFIA = (parseInt(fechaFin.split("-")[1]) - inicioAño.getMonth()) + (12 * añosDifFFIA);
      var añosDifFAFI = finAño.getFullYear() - parseInt(fechaInicio.split("-")[0]);
      var mesesDifFAFI = (finAño.getMonth() - parseInt(fechaFin.split("-")[1])) + (12 * añosDifFAFI);
      var añosDifFFFI = parseInt(fechaFin.split("-")[0]) - parseInt(fechaInicio.split("-")[0]);
      var mesesDifFFFI = (parseInt(fechaFin.split("-")[1]) - parseInt(fechaInicio.split("-")[1])) + (12 * añosDifFFFI);
      var mesInicio = inicioAño.getMonth() < 10 ? '0' + inicioAño.getMonth() : inicioAño.getMonth();
      var mesFin = finAño.getMonth() < 10 ? '0' + finAño.getMonth() : finAño.getMonth();
      switch (parseInt(this.asignacionesA[i]['tecnica'])) {
        case 1: {
          countVFD = this.asignacionesA[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + inicioAño.getMonth(), 0).getDate();
                if (i == mesesDifFFIA) {
                  this.totalDiasVFDA = this.totalDiasVFDA + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.totalDiasVFDA = this.totalDiasVFDA + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.totalDiasVFDA = this.totalDiasVFDA + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.totalDiasVFDA = this.totalDiasVFDA + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.totalDiasVFDA = this.totalDiasVFDA + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.totalDiasVFDA = this.totalDiasVFDA + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.totalDiasVFDA = this.totalDiasVFDA + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.totalDiasVFDA = this.totalDiasVFDA + diasMes;
                  }
                }
              }
            }
          }
          break;
        }
        case 2: {
          countBT = this.asignacionesA[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + inicioAño.getMonth(), 0).getDate();
                if (i == mesesDifFFIA) {
                  this.totalDiasBTA = this.totalDiasBTA + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.totalDiasBTA = this.totalDiasBTA + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.totalDiasBTA = this.totalDiasBTA + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.totalDiasBTA = this.totalDiasBTA + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.totalDiasBTA = this.totalDiasBTA + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.totalDiasBTA = this.totalDiasBTA + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.totalDiasBTA = this.totalDiasBTA + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.totalDiasBTA = this.totalDiasBTA + diasMes;
                  }
                }
              }
            }
          }
          break;
        }
        case 3: {
          countAUT = this.asignacionesA[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + inicioAño.getMonth(), 0).getDate();
                if (i == mesesDifFFIA) {
                  this.totalDiasAUTA = this.totalDiasAUTA + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.totalDiasAUTA = this.totalDiasAUTA + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.totalDiasAUTA = this.totalDiasAUTA + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.totalDiasAUTA = this.totalDiasAUTA + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.totalDiasAUTA = this.totalDiasAUTA + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.totalDiasAUTA = this.totalDiasAUTA + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.totalDiasAUTA = this.totalDiasAUTA + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.totalDiasAUTA = this.totalDiasAUTA + diasMes;
                  }
                }
              }
            }
          }
          break;
        }
        case 4: {
          countAOS = this.asignacionesA[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + inicioAño.getMonth(), 0).getDate();
                if (i == mesesDifFFIA) {
                  this.totalDiasAOSA = this.totalDiasAOSA + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.totalDiasAOSA = this.totalDiasAOSA + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.totalDiasAOSA = this.totalDiasAOSA + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.totalDiasAOSA = this.totalDiasAOSA + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.totalDiasAOSA = this.totalDiasAOSA + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2]));
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.totalDiasAOSA = this.totalDiasAOSA + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.totalDiasAOSA = this.totalDiasAOSA + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.totalDiasAOSA = this.totalDiasAOSA + diasMes;
                  }
                }
              }
            }
          }
          break;
        }
        case 5: {
          countMOT = this.asignacionesA[i]['Cuenta'];
          if (status == 1 || status == 2 || status == 3 || status == 4 || status == 4 || status == 5) {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + inicioAño.getMonth(), 0).getDate();
                if (i == mesesDifFFIA) {
                  this.totalDiasMOTA = this.totalDiasMOTA + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.totalDiasMOTA = this.totalDiasMOTA + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.totalDiasMOTA = this.totalDiasMOTA + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.totalDiasMOTA = this.totalDiasMOTA + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.totalDiasMOTA = this.totalDiasMOTA + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.totalDiasMOTA = this.totalDiasMOTA + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.totalDiasMOTA = this.totalDiasMOTA + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.totalDiasMOTA = this.totalDiasMOTA + diasMes;
                  }
                }
              }
            }
          }
          break;
        }
      }
    }
    this.porcentajeVFDA = (this.totalDiasVFDA / (diasDelAño * countVFD)) * 100;
    if (isNaN(this.porcentajeVFDA))
      this.porcentajeVFDA = 0;
    this.porcentajeBTA = (this.totalDiasBTA / (diasDelAño * countBT)) * 100;
    if (isNaN(this.porcentajeBTA))
      this.porcentajeBTA = 0;
    this.porcentajeAUTA = (this.totalDiasAUTA / (diasDelAño * countAUT)) * 100;
    if (isNaN(this.porcentajeAUTA))
      this.porcentajeAUTA = 0;
    this.porcentajeAOSA = (this.totalDiasAOSA / (diasDelAño * countAOS)) * 100;
    if (isNaN(this.porcentajeAOSA))
      this.porcentajeAOSA = 0;
    this.porcentajeMOTA = (this.totalDiasMOTA / (diasDelAño * countMOT)) * 100;
    if (isNaN(this.porcentajeMOTA))
      this.porcentajeMOTA = 0;
    this.porcentajeTotalA = (this.porcentajeVFDA + this.porcentajeBTA + this.porcentajeAUTA + this.porcentajeAOSA + this.porcentajeMOTA) / 5;
  }

  datosIndividualesA() {
    var inicioAño;
    var finAño;
    if (parseInt(this.fechaA.split("-")[1]) < 10) {
      inicioAño = new Date((parseInt(this.fechaA.split("-")[0]) - 1), 9, 1);
      finAño = new Date(parseInt(this.fechaA.split("-")[0]), 8, 30);
    } else {
      inicioAño = new Date(parseInt(this.fechaA.split("-")[0]), 9, 1);
      finAño = new Date((parseInt(this.fechaA.split("-")[0]) + 1), 8, 30);
    }
    var diasAño = 365;
    this.labels = [];
    this.porcentajesIndividualesVFDA = [];
    this.porcentajesIndividualesBTA = [];
    this.porcentajesIndividualesAUTA = [];
    this.porcentajesIndividualesAOSA = [];
    this.porcentajesIndividualesMOTA = [];
    this.porcentajesIndividualesA = [];
    for (var i = 0; i < this.especialistas.length; i++) {
      this.labels.push(this.especialistas[i]['NombreE']);
      if (this.especialistas[i]['IdTecnica'] == 1) {
        if (this.porcentajesIndividualesVFDA[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesVFDA[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 2) {
        if (this.porcentajesIndividualesBTA[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesBTA[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 3) {
        if (this.porcentajesIndividualesAUTA[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesAUTA[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else if (this.especialistas[i]['IdTecnica'] == 4) {
        if (this.porcentajesIndividualesAOSA[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesAOSA[this.especialistas[i]['IdEspecialista']] = 0;
        }
      } else {
        if (this.porcentajesIndividualesMOTA[this.especialistas[i]['IdEspecialista']] == null) {
          this.porcentajesIndividualesMOTA[this.especialistas[i]['IdEspecialista']] = 0;
        }
      }
    }
    for (var i = 0; i < this.asignacionesA.length; i++) {
      var status = this.asignacionesA[i]['IdStatus'];
      var fechaInicio = this.asignacionesA[i]['FechaInicio'].split("T")[0];
      var fechaFin = this.asignacionesA[i]['FechaFin'].split("T")[0];
      var mesInicio = inicioAño.getMonth() < 10 ? '0' + inicioAño.getMonth() : inicioAño.getMonth();
      var mesFin = finAño.getMonth() < 10 ? '0' + finAño.getMonth() : finAño.getMonth();
      var añosDifFFIA = parseInt(fechaFin.split("-")[0]) - inicioAño.getFullYear();
      var mesesDifFFIA = (parseInt(fechaFin.split("-")[1]) - inicioAño.getMonth()) + (12 * añosDifFFIA);
      var añosDifFAFI = finAño.getFullYear() - parseInt(fechaInicio.split("-")[0]);
      var mesesDifFAFI = (finAño.getMonth() - parseInt(fechaFin.split("-")[1])) + (12 * añosDifFAFI);
      var añosDifFFFI = parseInt(fechaFin.split("-")[0]) - parseInt(fechaInicio.split("-")[0]);
      var mesesDifFFFI = (parseInt(fechaFin.split("-")[1]) - parseInt(fechaInicio.split("-")[1])) + (12 * añosDifFFFI);
      if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5) {
        switch (this.asignacionesA[i]['tecnica']) {
          case 1: {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + mesInicio, 0).getDate();
                if (i == mesesDifFFIA) {
                  this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesVFDA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                  }
                }
              }
            }
            break;
          }
          case 2: {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + mesInicio, 0).getDate();
                if (i == mesesDifFFIA) {
                  this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesBTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                  }
                }
              }
            }
            break;
          }
          case 3: {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + mesInicio, 0).getDate();
                if (i == mesesDifFFIA) {
                  this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAUTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                  }
                }
              }
            }
            break;
          }
          case 4: {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + mesInicio, 0).getDate();
                if (i == mesesDifFFIA) {
                  this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesAOSA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                  }
                }
              }
            }
            break;
          }
          case 5: {
            if (parseInt(fechaInicio.split("-")[0] + fechaInicio.split("-")[1]) <= parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) < parseInt(finAño.getFullYear() + '' + mesFin) + 1) {
              for (let i = 0; i <= mesesDifFFIA; i++) {
                var diasMes = new Date(inicioAño.getFullYear(), i + mesInicio, 0).getDate();
                if (i == mesesDifFFIA) {
                  this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                } else {
                  this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else if (parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) <= parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaFin.split("-")[0] + '' + fechaFin.split("-")[1]) > parseInt(finAño.getFullYear() + '' + mesFin) + 1 && parseInt(fechaInicio.split("-")[0] + '' + fechaInicio.split("-")[1]) > parseInt(inicioAño.getFullYear() + '' + mesInicio) + 1) {
              for (let i = 0; i <= mesesDifFAFI; i++) {
                var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                if (i == 0) {
                  this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaInicio.split("-")[2]);
                } else {
                  this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                }
              }
            } else {
              if (fechaInicio.split("-")[1] == fechaFin.split("-")[1]) {
                this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + (parseInt(fechaFin.split("-")[2]) - parseInt(fechaInicio.split("-")[2])) + 1;
              } else {
                for (let i = 0; i <= mesesDifFFFI; i++) {
                  var diasMes = new Date(parseInt(fechaInicio.split("-")[0]), i + parseInt(fechaInicio.split("-")[1]), 0).getDate();
                  if (i == 0) {
                    this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + diasMes - parseInt(fechaInicio.split("-")[2]) + 1;
                  } else if (i == mesesDifFFFI) {
                    this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + parseInt(fechaFin.split("-")[2]);
                  } else {
                    this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] = this.porcentajesIndividualesMOTA[this.asignacionesA[i]['IdEspecialista']] + diasMes;
                  }
                }
              }
            }
            break;
          }
        }
      }
    }

    var primero = this.porcentajesIndividualesVFDA.concat(this.porcentajesIndividualesBTA);
    var segundo = primero.concat(this.porcentajesIndividualesAUTA);
    var tercero = segundo.concat(this.porcentajesIndividualesAOSA);
    var total = tercero.concat(this.porcentajesIndividualesMOTA);
    total = total.filter((nuevo) => {
      return nuevo != null;
    });
    for (var i = 0; i < total.length; i++) {
      total[i] = (parseInt(total[i]) / diasAño) * 100;
    }
    this.PIFinalesA = [{
      'data': total,
      'label': 'Ocupacion (%)'
    }];
  }

  ngOnInit() {
    this.DataRetriever.infoFecha.subscribe(infoFecha => {
      this.fechaA = infoFecha;
      if (this.fechaA == "") {
        this.fechaA = new Date().toISOString().split("T")[0];
      }
      this.traerAsignacionesM(this.fechaA).then(data => {
        this.asignacionesM = data;
        this.traerAsignacionesA(this.fechaA).then(datos => {
          this.asignacionesA = datos;
          this.DataRetriever.getData(env.url + "/api/allWorkers").then(especialistas => {
            this.especialistas = especialistas;
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
