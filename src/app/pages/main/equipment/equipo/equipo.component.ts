import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
  linkCancelar;
  linkGuardado;


  constructor(private router: Router, private route: ActivatedRoute, private dataRetriever: DataRetrieverService) { }

  setCliente(nombre) {
    this.client.next(nombre);
    document.getElementById('NombreEmpresa').innerHTML = ((this.client.getValue() == "")? `<div style="opacity: 0.4">Selecciona un Cliente`: `<div>${this.client.getValue()}` ) + "</div><div>Nuevo Registro de Equipo</div>";
    this.clientLogo();
  }

  clientLogo() {
    return "../../../../../assets/images/logos/" + ((this.client.getValue() == "" || !(env.empresasLogos).hasOwnProperty(this.client.getValue()))?'Unknown':env.empresasLogos[this.client.getValue()]) +"-logo.png"
  }

  initSequence() {
    if(window.location.href.includes('editarEquipo')) {
      for (let i of (Object.keys(this.cv))) {
        if(this.cv.hasOwnProperty(i)) {
          var input;
          var newValue;
          var campo;
          switch(i) {
            case 'AñosOperacion':
              campo = 'AnnosOperacion';
              newValue = this.cv[campo];
              break;
            case 'Fecha':
            case 'Vence':
            case 'FechaProduccion':
              campo = i;
              newValue = (this.cv[i] !== '0000-00-00')?new Date(this.cv[i]).toISOString().split("T")[0]: "";
              break;
            case 'TipoEquipo':              
              campo = i;
              newValue = this.translateTipoEquipo(this.cv[i]);
              break;
            case 'NombreEmpresa':
                campo = i;
                newValue = this.cv[i];
                this.setCliente(this.cv[i]);
                break;
            default:
              campo = i;
              newValue = this.cv[i];
              break;
          }
          input = document.getElementsByName(campo)[0];
          input.value = newValue;
        }        
      }
    }
  }

  setLinkCancelar() {
    let serial = window.location.href.split("/");
    if (window.location.href.includes('editar')) this.linkCancelar = `/main/consultaEquipos/detalles/${serial[serial.length - 1]}`;
    else this.linkCancelar = `/main/consultaEquipos/busqueda`;
  }
  
  setLinkGuardado() {
    let serial = window.location.href.split("/");
    if (window.location.href.includes('editar')) return `${env.url}/api/updateEquipment/${serial[serial.length - 1]}`;
    else return `${env.url}/api/createEquipment`;
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
      Swal.showLoading();
      let url = this.setLinkGuardado();
      console.log('url: ', url);
      this.dataRetriever.postData(url, JSON.stringify(equipment)).then(res => {
        if(res == "true") {
          Swal.fire({
            title: 'Equipo guardado !',
            text: `Equipo con serial ${equipment['NumeroSerial']}`,
            type: 'success'
          })
          this.router.navigate(['/main/consultaEquipos/busqueda']);
        } else {
          Swal.fire({
            title: 'Error !',
            text: `Hubo un error en el guardado del equipo`,
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
      this.initSequence(); 
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
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.setLinkCancelar();
    this.getClientsList();
    this.subscribeClient();
    if(window.location.href.includes('editar'))this.getEquipmentData();
  }

  translateTipoEquipo( tipo ) {
    console.log(tipo);
    if( Number.isInteger(tipo) ) {
      switch(tipo) {
        case 0:
          return "Arrancador suave";
        case 1:
          return "Equipo automatización";
        case 2:
          return "Interruptor";
        case 3:
          return "Motor";
        case 4:
          return "Variador";
      }
    } else {
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
}
