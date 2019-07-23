import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

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


  constructor(private dataRetriever: DataRetrieverService) { }

  setCliente(nombre) {
    this.client.next(nombre);
    document.getElementById('NombreEmpresa').innerHTML = ((this.client.getValue() == "")? `<div style="opacity: 0.4">Selecciona un Cliente`: `<div>${this.client.getValue()}` ) + "</div><div>Nuevo Registro de Equipo</div>";
    this.clientLogo();
  }

  clientLogo() {
    return "../../../../../assets/images/logos/" + ((this.client.getValue() == "" || !(env.empresasLogos).hasOwnProperty(this.client.getValue()))?'Unknown':env.empresasLogos[this.client.getValue()]) +"-logo.png"
  }

  guardarEquipo() {

    /**
     *  VALIDACIONES
     * 
     *  => Cliente, No.Serial y Tipo de equipo son obligatorios
     */
    let inputCliente = (<HTMLInputElement>document.getElementById('nCliente')).value;
    let inputSerial = (<HTMLInputElement>document.getElementById('NumeroSerial')).value;
    let inputTipoEquipo = (<HTMLInputElement>document.getElementById('TipoEquipo')).value;

    if (inputCliente === "" || inputSerial == "" || inputTipoEquipo == "Selecciona una opción") {
      Swal.fire({
        title: 'Datos faltantes',
        html: `Los campos con <span style="color='red'; font-weight: 600;">*</span> son obligatorios`,
        type: 'warning'
      });
    }
    else {
      var equipment = {};
      var inputs = document.getElementsByTagName('input');
      for(let i = 0; i < inputs.length; i++){
        equipment[`${inputs[i].name}`] = inputs[i].value;
        //console.log(`${inputs[i].name}: `, inputs[i].value);
      }
      var selects = document.getElementsByTagName('select');
      for(let i = 0; i < selects.length; i++ ){
        equipment[`${selects[i].name}`] = (selects[i].value == "Selecciona una opción")? "" : (selects[i].name == "TipoEquipo")? this.translateTipoEquipo(selects[i].value) : selects[i].value;
        // console.log(`${selects[i].name}:`, selects[i].value);
      }
      console.log('Form: ', equipment);
      Swal.showLoading();
      this.dataRetriever.postData(env.url + '/api/createEquipment', JSON.stringify(equipment)).then(res => {
        if(res == "true") {
          Swal.fire({
            title: 'Equipo creado !',
            text: `Equipo con serial ${equipment['NumeroSerial']}`,
            type: 'success'
          })
        } else {
          Swal.fire({
            title: 'Error !',
            text: `Hubo un error en la creación del equipo`,
            type: 'error'
          })
        }

      })      
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
    console.log(tipo);
    switch(tipo) {
      case "Arrancador suave":
        return 0;
      case "Equipo automatización":
        return 1;
      case "Interruptor":
        return 2;
      case "Motor":
        return 3;
      case "Variador":
        return 4;
    }
  }
}
