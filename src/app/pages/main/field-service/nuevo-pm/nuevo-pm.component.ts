import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import * as env from 'src/assets/js/variables';

@Component({
  selector: 'app-nuevo-pm',
  templateUrl: './nuevo-pm.component.html',
  styleUrls: ['./nuevo-pm.component.scss']
})
export class NuevoPMComponent implements OnInit {

  constructor(private httpService: HttpClient, private router: Router) { }

  crearPM(){
    var nombre = <HTMLInputElement> document.getElementById("name");
    var Nombre = nombre.value;
    var email = <HTMLInputElement> document.getElementById("user");
    var Email = email.value+'@siemens.com';

    var datos = {"name": Nombre,
                 "email": Email};

    if(Nombre == ""){
    Swal.fire(
      'Campos requeridos',
      'Debe completar el campo Nombre',
      'warning'
      )
    }else if(Email == "@siemens.com"){
      Swal.fire(
        'Campos requeridos',
        'Debe completar el campo Email',
        'warning'
        )
    }

    if(Nombre != "" && Email != "@siemens.com"){
      this.httpService.post(env.url + '/api/newPM', datos).toPromise()
                .then((res) => {
                  if(res == "true"){
                      Swal.fire(
                       'PM Agregado',
                       Nombre,
                       'success'
                      )
                      this.router.navigate(['/main/field-service']);
                  }
                  else{
                    Swal.fire(
                      'Error agregando a',
                      Nombre,
                      'error'
                    )  
                  }
                });
    }

  }

  ngOnInit() {
  }

}
