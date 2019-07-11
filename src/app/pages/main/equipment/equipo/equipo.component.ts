import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { Subject, BehaviorSubject } from 'rxjs';
import * as pdf from '../../../../../assets/js/createReportPdf';
import * as env from '../../../../../assets/js/variables';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {
  private searchTerm;
  listaEmpresas : JSON[];
  client = new BehaviorSubject('');
  cv;


  constructor(private route: ActivatedRoute, private dataRetriever: DataRetrieverService) { }

  setCliente(nombre) {
    this.client.next(nombre);
    document.getElementById('NombreEmpresa').innerHTML = this.client.getValue();
    this.clientLogo();
  }

  clientLogo() {
    return "../../../../../assets/images/logos/" + ((this.client.getValue() == "")?'Unknown':env.empresasLogos[this.client.getValue()]) +"-logo.png"
  }

  guardarEquipo() {
    var inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
      console.log(`Input ${i+1}:`, inputs[i].value);
    }
    var selects = document.getElementsByTagName('select');
    for(let i = 0; i < selects.length; i++ ){
      console.log(`Select ${i+1}:`, selects[i].value);
    }
  }

  getClientsList() {
    this.dataRetriever.getData(env.url + '/api/clientList').then(data => {
      this.listaEmpresas = data as JSON[];
      console.log(this.listaEmpresas);
    })

  }

  getEquipmentData() {
    this.dataRetriever.getData(env.url + '/api/getEquipmentBySerial/' + this.searchTerm).then( results => {
      this.cv = results[0];
      this.cv['AnnosOperacion'] = this.cv['AñosOperacion'];
    });
  }

  subscribeClient() {
    var inputCliente = <HTMLInputElement>document.getElementById('nCliente');
    inputCliente.addEventListener('change', () => {
      // console.log('Cliente: ', inputCliente.value);
      this.setCliente(inputCliente.value);
    })
  }

  ngOnInit() {
    this.getClientsList();
    this.subscribeClient();
  }

  translateTipoEquipo( tipo ) {
    switch(tipo) {
      case 0:
        return "Arrancador suave";
      case 1:
        return "Equipo Automatización";
      case 2:
        return "Interruptor";
      case 3:
        return "Motor";
      case 4:
        return "Variador";
    }
  }

  showReport( jsonReport ) {
    console.log(jsonReport);
    pdf.createPDF(jsonReport);
  }



}
