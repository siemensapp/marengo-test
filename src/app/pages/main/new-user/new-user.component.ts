import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import * as env from 'src/assets/js/variables';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {   
    
  private LOGO = require("src/assets/images/others/logo.jpg");
  constructor(private httpService: HttpClient, private router: Router) { }

  crearUsuario(){
    var nombre = <HTMLInputElement> document.getElementById("name");
    var Nombre = nombre.value;
    var email = <HTMLInputElement> document.getElementById("user");
    var Email = email.value+'@siemens.com';
    var pass = <HTMLInputElement> document.getElementById("password");
    var Pass = pass.value;

    //console.log(Nombre);
    //console.log(Pass);

    var datos = {"name": Nombre,
                 "email": Email,
                 "password": Pass
    };

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
    }else if(Pass == ""){
      Swal.fire(
        'Campos requeridos',
        'Debe completar el campo password',
        'warning'
       )
    }

    //console.log(datos);
    if(Nombre != "" && Email != "@siemens.com" && Pass != ""){
      this.httpService.post(env.url + '/api/registerDesktop', datos).toPromise()
                .then((res) => {
                  if(res == "true"){
                      Swal.fire(
                       'Usuario Agregado',
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
