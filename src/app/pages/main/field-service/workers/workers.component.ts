import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../../../../assets/js/variables';
import Swal from 'sweetalert2'; 
import { DataRetrieverService} from '../../services/data-retriever.service';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { PushNotificationsService } from '../../services/push-notifications.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  private VAPID_PUBLIC = "BEwOkuB14wZmYFcToortGXoFqc6HO_aXhhn_3mOU-h8B9x_z92pZ_WUpCExXt0cbCo61F1mJZ_D_vRgncaHvbSs";


  setColor(option) {
    switch(option) {
      case 'En Servicio':
        return '#FF7115';
      case 'Compensatorio':
        return '#008DFF';
      case 'Vacaciones':
        return '#FFE300';
      case 'Disponible':
        return '#06AA00';
      case 'Incapacidad':
        return '#BB0000';
      case 'Permiso':
        return '#5B00BB';
      case 'Capacitación':
        return '#8B8B8B';
      case 'Disponible Fin de Semana':
        return '#A04B00';
    }    
  }

  getInfoEspecialista(resultado: JSON){

    this.dataRetriever.getEspecialista(resultado);
  }
  
  borrar(IdEspecialista: number, NombreE: string){
    
    Swal.fire({
      type: "warning",
      title: "Seguro desea borrar este especialista?",
      text: "Esta operacion es irreversible",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "BORRAR",
      cancelButtonText: "CANCELAR",
      html: NombreE
    }).then((result) => {
        if(result.value){
          var url= env.url+'/api/deleteWorker/'+IdEspecialista;
          this.dataRetriever.borrarEspecialista(url).then((respuesta) => {
            console.log(respuesta);
            if(respuesta == "true"){
                Swal.fire(
                  'Especialista borrado',
                  NombreE,
                  'success'
                ).then(()=> location.reload())
                
            }
          else{
            Swal.fire(
              'Error al borrar a',
              NombreE,
              'error'
            )
          }
          });
          
        }
    });
  }

  verCambioFecha(){
    let fechaCambio=new Date().toISOString().split("T")[0];
    document.getElementById('pickDate').addEventListener("change", (event) => {
      fechaCambio=(<HTMLInputElement>event.target).value;
      this.dataRetriever.obtenerCoordsPorFecha(fechaCambio);
      this.httpService.get(env.url + '/api/workersList/'+fechaCambio).subscribe(
        data => {
          this.Resultados = data as JSON[];
        }
      )
  });
  }

  // constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService, private router: Router, private swPush: SwPush, private pushService: PushNotificationService) { }
  constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService, private router: Router, private swPush: SwPush, private pushService: PushNotificationsService) { }
  Resultados : JSON[];
  ngOnInit() {
    this.notificationsCheck();
    console.log(this);
     var today = new Date().toISOString();
     var fechaHoy = today.split("T")[0];     
     document.getElementById('pickDate').setAttribute("value", fechaHoy);
     console.log(fechaHoy);
     this.verCambioFecha();
     this.httpService.get(env.url + '/api/workersList/'+fechaHoy).subscribe(
      data => {
        this.Resultados = data as JSON[];
      }
    )
  }

  notificationsCheck() {
    if( this.swPush.isEnabled ) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC
      }).then( subscription => {
        this.pushService.sendSubscription(subscription);
      }).catch(console.error)
    }
  }

}
