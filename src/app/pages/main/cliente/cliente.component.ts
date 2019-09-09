import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from 'src/assets/js/variables';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import {DataRetrieverService} from 'src/app/pages/main/services/data-retriever.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {
  constructor(private httpService: HttpClient, private router: Router, private DataRetriever: DataRetrieverService) { }
  
  ResultadosClientes: JSON[];

  addCliente(){
    var cliente = <HTMLInputElement> document.getElementById("clienteInput");
    var Cliente = cliente.value;

    var datos = {
      "NombreEmpresa": Cliente
    };

    var url = env.url + '/api/addCliente';
    this.httpService.post(url,datos).toPromise().then((res) => {
      if(res == "true"){
        Swal.fire(
          'Cliente añadido',
          Cliente,
          'success'
        ).then(() => location.reload())
      }else if(res == "duplicated"){
        Swal.fire(
          'No se pudo añadir cliente',
          'Ya existe '+Cliente,
          'error'
        )
      }else if(res == "false"){
        Swal.fire(
          'Error al añadir en base de datos',
          Cliente,
          'error'
        )
      }
      
    })
  }


  ngOnInit() {
    this.DataRetriever.getData(env.url + '/api/clientList').then(data => {
      this.ResultadosClientes = data as JSON[];
    })
  }

}
