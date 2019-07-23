import { Component, OnInit } from '@angular/core';
import { TreeItemFolderState, TreeItem, SiFilteredSearchModule } from '@simpl/marengo-ng';
import { DataRetrieverService } from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  resultados = new Subject();
  firstSearch = new Subject();
  companiesList = [];
  loading;
  //options: ['ACERIAS DE COLOMBIA S.A.S', 'ACERIAS PAZ DEL RIO S.A.', 'CEMENTOS ARGOS S.A.', 'CABLES DE ENERGIA Y TELECOMUNICACIONES S.A.', 'ECOPETROL S.A.', 'T.C.BUEN S.A.', 'PAVCO', 'PRODUCTOS FAMILIA S.A.', 'POSTOBON S.A.', 'SOCIEDAD PORTUARIA REGIONAL DE BUENAVENTURA S.A.']
  criteria = [
    {name: 'company', label: 'Compañia', options: ["ACERIAS DE COLOMBIA S.A.S", "ACERIAS PAZ DEL RIO S.A.", "ALPINA PRODUCTOS ALIMENTICIOS S.A.", "AMCOR RIGID PLASTICS DE COLOMBIA S.A.", "BAVARIA S.A.", "BAYER CROPSCIENCE S.A.", "C.I. PRODECO S.A.", "CABLES DE ENERGIA Y TELECOMUNICACIONES S.A.", "CARVAJAL PULPA Y PAPEL S.A.", "CEMENTOS ARGOS S.A.", "CEMENTOS TEQUENDAMA S.A.", "CEMENTOS TEQUENDAMA", "CEMEX COLOMBIA S.A.", "CERVECERIA UNION S.A.", "CHALLENGER S.A.S.", "CIA. DE GALLETAS NOEL S.A.", "COCACOLA FEMSA", "COLOMBINA S.A.", "CONTECAR", "DRINKS DE COLOMBIA S.A.S", "ECOPETROL S.A.", "FABRICATO S.A.", "FLEXO SPRING", "GRUPO PHOENIX", "HOCOL S.A.", "HOLCIM COLOMBIA S.A.", "INGENIO CARMELITA S.A.", "INGENIO LA CABAÑA S.A.", "INGENIO PROVIDENCIA S.A.", "INGENIO RISARALDA", "INGENIO RISARALDA S.A.", "INGENIO SAN CARLOS", "KAESER", "KAESER COMPRESORES DE COLOMBIA LTDA.", "LEONISA S.A.", "LINDE COLOMBIA S.A.", "MEALS DE COLOMBIA S.A.S.", "MULTIDIMENSIONALES S.A.", "NACIONAL DE CHOCOLATES S.A.", "NESTLÉ PURINA PETCARE DE COLOMBIA S.A.", "OLEODUCTO DE LOS LLANOS ORIENTALES S.A.", "PAVCO", "PCH SUBA", "PCH USAQUEN", "PGI COLOMBIA LTDA", "POSTOBON S.A.", "PRODUCTOS ALIMENTICIOS DORIA S.A.S.", "PRODUCTOS FAMILIA S.A.", "PROPILCO S.A.", "PUERTO BRISA S.A.", "QUALA S.A.", "RED EAGLE", "SMURFIT KAPPA CARTON DE COLOMBIA S.A", "SOCIEDAD PORTUARIA REGIONAL DE BUENAVENTURA S.A.", "SOCIEDAD PORTUARIA REGIONAL DE CARTAGENA S.A", "SOFASA S.A.", "TABLEMAC", "TERMINAL DE CONTENEDORES DE CARTAGENA S.A", "T.C.BUEN S.A."] },
    {name: 'equipment-type', label: 'Tipo de Equipo', options: ['Arrancadores', 'Motores', 'Automatización', 'Variadores', 'Interruptores']},
    {name: 'MLFB'},
    {name: 'serial', label: 'Serial'}
  ];

  testExcel() {
    // this.excelService.exportAsExcelFile( auxExcel.createExcel(JSON.parse(this.infoReporte[0]['HojaTiempo'])) , 'TEST');
    // this.excelService.exportAsExcelFile('TEST');
  }

  translateTipoEquipo( tipo ) {
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
  }

  translateTipoEquipoNumero( tipo ) {
    switch(tipo) {
      case "Arrancadores":
        return 0;
      case "Automatización":
        return 1;
      case "Interruptores":
        return 2;
      case "Motores":
        return 3;
      case "Variadores":
        return 4;
    }
  }

  public logEvent(event) {
    this.resultados.next(null);
    this.loading = true;
    this.firstSearch.next(false);
    console.log(event);
    var params = {tipo: "", nombre: "", mlfb: "", serial: ""};
    for(let x of event['criteria']) { 
      if( x['name'] == 'equipment-type' ) params['tipo'] = String(this.translateTipoEquipoNumero(x['value']));
      if( x['name'] == 'company' ) params['nombre'] = x['value'];
      if( x['name'] == 'MLFB' ) params['mlfb'] = x['value'];
      if( x['name'] == 'serial') params['serial'] = x['value'];
    }
    this.dataRetriever.postData(env.url + '/api/getEquipmentsBy/', JSON.stringify(params)).then( data => {
      this.loading = false;
      this.resultados.next(data);
      console.log(this.resultados)      
    } );
  }


  constructor( private dataRetriever: DataRetrieverService ) { }

  ngOnInit() {
    this.companiesList = Object.keys(env.empresasLogos);
    this.firstSearch.next(true);
    this.loading = false;
  }

}
