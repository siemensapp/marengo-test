import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../../../../assets/js/variables';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import {DataRetrieverService} from '../../services/data-retriever.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})


export class TarifasComponent implements OnInit {
constructor(private httpService: HttpClient, private router: Router, private DataRetriever: DataRetrieverService) { }

ResultadosTecnicas : JSON[];

  ngOnInit() {
    this.DataRetriever.getData(env.url + '/api/getTarifas').then(data => {
      this.ResultadosTecnicas = data as JSON[];
    })
  }

}
