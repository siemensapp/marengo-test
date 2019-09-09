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

  ngOnInit() {
    this.DataRetriever.getData(env.url + '/api/clientList').then(data => {
      this.ResultadosClientes = data as JSON[];
    })
  }

}
