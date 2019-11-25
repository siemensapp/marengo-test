import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataRetrieverService } from '../main/services/data-retriever.service';
import { url } from '../../../assets/js/variables';


@Component({
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit{
  constructor (private router: Router, private dataRetriever: DataRetrieverService){}
  private LOGO = require("src/assets/images/others/logo.jpg");
  ngOnInit() {
    this.logout();
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('authToken');
    //console.log('Token removed ! ');
  }

  login() {
    var user = (<HTMLInputElement>document.getElementById("user")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var data = JSON.stringify({user: user, password: password});
    //Swal.showLoading();
    this.dataRetriever.postData( url + '/api/loginDesktop', data ).then(result => {
      
      if(!result.hasOwnProperty('token')) Swal.fire({type: 'error', title: 'Error', text: String(result)})
      else {
        Swal.fire({type: 'success', title: 'Exito!', showCancelButton: false, showConfirmButton: false,timer: 1500})
        .then(() => { 
          //console.log('Result: ', result);
          localStorage.setItem('name', result['nombre']);
          localStorage.setItem('authToken', result['token']);
          this.router.navigate(['/main/field-service/workers']);            
        });          
      }
    })
  }
}
