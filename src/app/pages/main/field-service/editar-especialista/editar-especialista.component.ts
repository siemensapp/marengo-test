import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataRetrieverService} from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-especialista',
  templateUrl: './editar-especialista.component.html',
  styleUrls: ['./editar-especialista.component.scss']
})
export class EditarEspecialistaComponent implements OnInit {
  infoEspecialista={};
  fotoNueva;
  subirArchivo(){
    var click = document.getElementById("fileInput");   
    click.click();
    click.onchange = (event) => {
        //Previsualizar la imagen en el div campoImagen
        var campoImagen = <HTMLImageElement>document.getElementById("campoImagen");
        campoImagen.src = URL.createObjectURL((<HTMLInputElement>event.target).files[0]);
        //Crear version base 64 de la img
        var fileReader = new FileReader();
        fileReader.addEventListener("load", (e:any) => {
           document.getElementById("resultadoImagen").innerHTML = e.target.result;
           this.fotoNueva=e.target.result;
           
        })
        
        fileReader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
    };
  }

  processFile1(documentInput: any){
    //  debugger;
    //console.log("******************estoy adentro 1*****************");
      var doc : File = documentInput.files[0];
      var reader = new FileReader();
  
      reader.addEventListener('load',function(a:any){
             
        document.getElementById("resultadoCertificadoA").innerHTML = a.target.result;
        
     })
     reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
    }
  
    processFile2(documentInput: any){
      //  debugger;
      //console.log("******************estoy adentro 2*****************");
        var doc : File = documentInput.files[0];
        var reader = new FileReader();
    
        reader.addEventListener('load',function(a:any){
               
          document.getElementById("resultadoCertificadoMD").innerHTML = a.target.result;
          
       })
       reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
      }

  editarEspecialista(){
    
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
    var datos13 = document.forms["formulario"].elements[12].value;
    var datos14 = document.forms["formulario"].elements[14].value;
    var datos15 = document.forms["formulario"].elements[16].value;

    //console.log(datos14);
    var certificadoAl = document.getElementById("resultadoCertificadoA").innerHTML;
    var certificadoManejo = document.getElementById("resultadoCertificadoMD").innerHTML;

    if (certificadoAl != '' && certificadoAl.split(';base64,').pop() != 
        this.infoEspecialista['CertificadoAlturas']){
        certificadoAl = document.getElementById("resultadoCertificadoA").innerHTML;
    }else {
      certificadoAl = "data:application/pdf;base64,"+ this.infoEspecialista['CertificadoAlturas'];
    }

    if (certificadoManejo != '' && certificadoManejo.split(';base64,').pop() != 
        this.infoEspecialista['CertificadoMD']){
        certificadoManejo = document.getElementById("resultadoCertificadoMD").innerHTML;
    }else {
      certificadoManejo = "data:application/pdf;base64,"+ this.infoEspecialista['CertificadoManejo'];
    }

    var datos = {"IdEspecialista" : datos3,
                 "NombreE" : datos4,
                 "Celular" : datos5,
                 "IdTecnica" : datos6,
                 "FechaNacimiento" : datos7,
                 "CeCo" : datos8,
                 "GID" : datos9,
                 "CedulaCiudadania" : datos10,
                 "LugarExpedicion" : datos11,
                 "TarjetaIngresoArgos" : datos12,
                 "email": datos13,
                 "fechaVA": datos14,
                 "fechavm": datos15,
                 "Foto" : this.fotoNueva,
                 "CertificadoAlturas" : certificadoAl,
                 "CertificadoMD" : certificadoManejo
                };
    //console.log(datos);
   
     this.httpService.post(env.url + '/api/editWorker', datos).toPromise()
                 .then((res) => {
                   console.log(res);
                   
                if(res == "true"){
                    Swal.fire(
                     'Especialista Modificado',
                     datos4,
                     'success'
                    )
                    this.router.navigate(['/main/field-service/workers']);
                }
                else{
                  Swal.fire(
                    'Error Modificando a',
                    datos4,
                    'error'
                  )  
                }
                 });
  }

editarEspecialistaAppMovil(){
  var cedula = document.forms["formulario"].elements[9].value;
  var IdEspecialista = document.forms["formulario"].elements[2].value;
  var datos = {"CedulaCiudadania": cedula};
    this.httpService.post(env.url + '/api/editUserApp/' + IdEspecialista, datos).toPromise()
    .then((res) => {
      //console.log(res);
      
  if(res == "true"){
      Swal.fire(
        'Especialista Modificado AppMovil',
        cedula,
        'success'
      )
      this.router.navigate(['/main/field-service/workers']);
  }
  else{
    Swal.fire(
      'Error Modificando en AppMovil a',
      cedula,
      'error'
    )  
  }
    });
}



  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService, private ActivatedRoute: ActivatedRoute, private router: Router) { }
  ResultadoField : JSON;
  ngOnInit() {
    this.DataRetriever.infoEspecialista.subscribe(infoEspecialista => {this.infoEspecialista = infoEspecialista;
    var combo = <HTMLSelectElement> document.getElementById('comboTecnica');
    combo.options[this.infoEspecialista['IdTecnica']-1].selected = true;
    });
    //console.log(this.infoEspecialista);
  }

}