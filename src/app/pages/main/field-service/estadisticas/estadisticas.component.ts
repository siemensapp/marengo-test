import { Component, OnInit } from '@angular/core';
import * as env from '../../../../../assets/js/variables';
import {HttpClient} from '@angular/common/http';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


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
  porcentajesIndividuales;
  PIFinales;
  especialistas;
  asignaciones;
  fechaA = "";
  totalDiasVFD=0;
  totalDiasBT=0;
  totalDiasAUT=0;
  totalDiasAOS=0;
  totalDiasMOT=0;
  porcentajeVFD=0;
  porcentajeBT=0;
  porcentajeAUT=0;
  porcentajeAOS=0;
  porcentajeMOT=0;
  porcentajeTotal=0;
  diasMaximosMes;
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) { }

  traerAsignaciones(fecha : string){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getMonthAssignments/'+fecha).map( result => result).subscribe(data =>{
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

  datosGraficos()
  {
    var diasDelMes= new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();   
      var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
      var countVFD, countBT, countAUT, countAOS, countMOT;
      console.log(this.asignaciones);
      for(var i=0; i<this.asignaciones.length; i++){
        var status = this.asignaciones[i]['IdStatus'];
        var fechaInicio= this.asignaciones[i]['FechaInicio'];
        var fechaFin = this.asignaciones[i]['FechaFin'];
      switch(parseInt(this.asignaciones[i]['tecnica'])) {
        case 1:
          {
            countVFD = this.asignaciones[i]['Cuenta'];
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
               if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
                this.totalDiasVFD = this.totalDiasVFD+(parseInt(fechaFin.split("-")[2]));
               }
               else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
                this.totalDiasVFD = this.totalDiasVFD+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
               }
               else{
                this.totalDiasVFD = this.totalDiasVFD+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
               }
            }
            break;
          }
        case 2:
          {
            countBT = this.asignaciones[i]['Cuenta'];
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
              if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
                this.totalDiasBT = this.totalDiasBT+(parseInt(fechaFin.split("-")[2]));
               }
               else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
                this.totalDiasBT = this.totalDiasBT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
               }
               else{
                this.totalDiasBT = this.totalDiasBT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
               }
            }
            break;
          }
        case 3:
        {
          countAUT = this.asignaciones[i]['Cuenta'];
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasAUT = this.totalDiasAUT+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasAUT = this.totalDiasAUT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasAUT = this.totalDiasAUT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
          break;
        }
        case 4:
        {
          countAOS = this.asignaciones[i]['Cuenta'];
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasAOS = this.totalDiasAOS+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasAOS = this.totalDiasAOS+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasAOS = this.totalDiasAOS+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
          break;
        }
        case 5:
        {
          countMOT = this.asignaciones[i]['Cuenta'];
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasMOT = this.totalDiasMOT+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasMOT = this.totalDiasMOT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasMOT = this.totalDiasMOT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
          break;
        }
      } 
    }
    this.porcentajeVFD = (this.totalDiasVFD/(diasDelMes*countVFD))*100;
    if(isNaN(this.porcentajeVFD))
      this.porcentajeVFD = 0;
    this.porcentajeBT = (this.totalDiasBT/(diasDelMes*countBT))*100;
    if(isNaN(this.porcentajeBT))
      this.porcentajeBT = 0;
    this.porcentajeAUT = (this.totalDiasAUT/(diasDelMes*countAUT))*100;
    if(isNaN(this.porcentajeAUT))
      this.porcentajeAUT = 0;
    this.porcentajeAOS = (this.totalDiasAOS/(diasDelMes*countAOS))*100;
    if(isNaN(this.porcentajeAOS))
      this.porcentajeAOS = 0;
    this.porcentajeMOT = (this.totalDiasMOT/(diasDelMes*countMOT))*100;
    if(isNaN(this.porcentajeMOT))
      this.porcentajeMOT = 0;
    this.porcentajeTotal = (this.porcentajeVFD + this.porcentajeBT + this.porcentajeAUT + this.porcentajeAOS + this.porcentajeMOT)/5;
    }

    datosIndividuales(){
      var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
      var diasDelMes= new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();   
      this.labels = [];
      for(var i=0; i<this.especialistas.length;i++)
      {
          this.labels.push(this.especialistas[i]['NombreE']);
      }
      this.porcentajesIndividuales = [];
      for(var i=0; i<this.asignaciones.length; i++){
        if(this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']]==null){
          this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']]=0;
        }
        var status=this.asignaciones[i]['IdStatus'];
        var fechaInicio= this.asignaciones[i]['FechaInicio'];
        var fechaFin = this.asignaciones[i]['FechaFin'];
        if(status == 1 || status == 2 || status == 3 || status == 4 || status == 5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']]+(parseInt(fechaFin.split("-")[2].split("T")[0]))+1;
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']]+(diasDelMes-parseInt(fechaInicio.split("-")[2].split("T")[0]))+1;
             }
             else{
              this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']] = this.porcentajesIndividuales[this.asignaciones[i]['IdEspecialista']]+(parseInt(fechaFin.split("-")[2].split("T")[0])-parseInt(fechaInicio.split("-")[2].split("T")[0]))+1;
            }
        }
     }
      this.porcentajesIndividuales = this.porcentajesIndividuales.filter((nuevo)  => {
        return nuevo != null;
      });
      for(var i=0; i<this.porcentajesIndividuales.length; i++){
        this.porcentajesIndividuales[i] = (parseInt(this.porcentajesIndividuales)/diasDelMes)*100; 
      }
      this.PIFinales=[{'data': this.porcentajesIndividuales, 'label': 'Ocupacion (%)'}];
    }

  ngOnInit() {
      this.DataRetriever.infoFecha.subscribe(infoFecha => {
        this.fechaA = infoFecha; 
        this.traerAsignaciones(this.fechaA).then(data =>{
        this.asignaciones = data;
        this.DataRetriever.getData(env.url+"/api/allWorkers").then(especialistas => {
          this.especialistas = especialistas;
          console.log(this.especialistas);
          this.datosGraficos();
          this.datosIndividuales();
          })
        
      });  
      });
        
  }

}
