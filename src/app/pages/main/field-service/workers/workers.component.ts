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
        return '#FFFFFF';
      case 'Incapacidad':
        return '#BB0000';
      case 'Permiso':
        return '#5B00BB';
      case 'Capacitación':
        return '#8B8B8B';
      case 'Disponible Fin de Semana':
        return '#06AA00';
      default : 
        return '#FFFFFF';
    }    
  }

  getInfoEspecialista(resultado: JSON){

    this.dataRetriever.getEspecialista(resultado);
    
    console.log(resultado);
  }

  
  borrar(IdEspecialista: number, NombreE: string){
    
    console.log(IdEspecialista);
    
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
          var url= env.url+'/api/deleteWorker/'+NombreE; //elimina el especialista por medio del nombre y no por el id como esta en el back
          this.dataRetriever.borrarEspecialista(url).then((respuesta) => {
            console.log(respuesta);
            if(respuesta == "true"){
                Swal.fire(
                  'Especialista borrado',
                  NombreE,
                  'success'
                ).then(()=> location.reload())
                
            }else{
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
  

  borrarUserApp(CedulaCiudadania: string){
    var url = env.url+'/api/deleteUserApp/'+CedulaCiudadania;
    this.httpService.get(url).toPromise().then((res) => {// borrado de especialista en app movil
      /*if (res == "true") {
        Swal.fire(
          'Asignacion Editada', 
          '',
          'success'
        ).then(() => location.reload())
      } else {
        Swal.fire(
          'Error al editar asignacion',
          'No se pudo completar la accion',
          'error'
        )
      }*/
    })
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
  trabajadoresCer : JSON[];
  cadena : string;
  cadena1 : string;
  cadena2 : string;
  cadena3 : string;
  ngOnInit() {
    this.notificationsCheck();
    console.log(this);
     var today = new Date().toISOString();
     var fechaHoy = today.split("T")[0]; 
     console.log(fechaHoy);    
     document.getElementById('pickDate').setAttribute("value", fechaHoy);
     this.verCambioFecha();
     this.httpService.get(env.url + '/api/workersList/'+fechaHoy).subscribe(
      data => {
        this.Resultados = data as JSON[];
        console.log(this.Resultados);
        var longitud = Object.keys(this.Resultados).length;
        var i;
        var j=0,k=0;
        for (i=0;i< longitud;i++){
          var fechava = this.Resultados[i]["fechaVA"]; 
          var nombre = this.Resultados[i]["NombreE"];
          var fechava1 = fechava.split("T")[0];
          var fechahoy1= new Date(fechaHoy).getTime();
          var fechaVA1= new Date(fechava1).getTime();
          var dias = Math.floor((fechaVA1-fechahoy1)/(1000*60*60*24));
          var fechavm = this.Resultados[i]["fechavm"]; 
          var fechavm1 = fechavm.split("T")[0];
          var fechaVM1= new Date(fechavm1).getTime();
          var dias1 = Math.floor((fechaVM1-fechahoy1)/(1000*60*60*24));

          //Arma un string con los especialistas a los que el certificado de alturas se vence en 15 días o 0 días
          if(dias==15||dias==0)    {

            this.cadena="{"+"\""+"nombre"+"\""+":"+"\""+nombre+"\""+","+"\""+"dias"+"\""+":"+dias+","+"\""+"Tipo"+"\""+":"+"\""+"Alturas"+"\""+"}";
            if (j>0){
            this.cadena1= this.cadena1+","+this.cadena;
            }    else { 
              this.cadena1= this.cadena;

            }        
            j=j+1;
          }      
          //Arma un string con los especialistas a los que el certificado de manejo se vence en 15 días o 0 días
          if(dias1==15||dias1==0)    {

            this.cadena2="{"+"\""+"nombre"+"\""+":"+"\""+nombre+"\""+","+"\""+"dias"+"\""+":"+dias1+","+"\""+"Tipo"+"\""+":"+"\""+"Manejo"+"\""+"}";
            if (k>0){
            this.cadena3= this.cadena3+","+this.cadena2;
            }    else { 
              this.cadena3= this.cadena2;

            }        
            k=k+1;
          }     
          
        }
        
        if (j>0||k>0){
          console.log(j);
          console.log(k);
          var todos; // = "["+this.cadena1+","+this.cadena3+"]";
          if (j>0){
            todos = "["+this.cadena1+"]";
          }
          if (k>0){
            todos = "["+this.cadena3+"]";
          }
          
          if (j>0&&k>0){
            todos = "["+this.cadena1+","+this.cadena3+"]";
          }
    
       this.trabajadoresCer = JSON.parse(todos);
       console.log(this.trabajadoresCer);
       this.httpService.post(env.url + '/api/sendMailCertification', this.trabajadoresCer).toPromise()
                 .then((res) => {
                   console.log(res);
                   
                if(res == "true"){
                    console.log("Datos enviados");
                }
                else{
                  console.log("No se environ los datos");
                }
                 });}else{
                   console.log("Lista vacia")
                 }
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
