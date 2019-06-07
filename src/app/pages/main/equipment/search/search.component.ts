import { Component, OnInit } from '@angular/core';
import { TreeItemFolderState, TreeItem, SiFilteredSearchModule } from '@simpl/marengo-ng';
import { DataRetrieverService } from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';

import { Subject } from 'rxjs';
import { ExcelService } from 'src/app/shared/excel.service';
import * as auxExcel from '../../../../../assets/js/createExcel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  resultados = new Subject();
  firstSearch = new Subject();
  loading;
  criteria = [
    {name: 'company', label: 'Compañia', options: ['ACERIAS DE COLOMBIA S.A.S', 'ACERIAS PAZ DEL RIO S.A.', 'CEMENTOS ARGOS S.A.', 'CABLES DE ENERGIA Y TELECOMUNICACIONES S.A.', 'ECOPETROL S.A.', 'T.C.BUEN S.A.', 'PAVCO', 'PRODUCTOS FAMILIA S.A.', 'POSTOBON S.A.', 'SOCIEDAD PORTUARIA REGIONAL DE BUENAVENTURA S.A.']},
    {name: 'equipment-type', label: 'Tipo de Equipo', options: ['Arrancadores', 'Motores', 'Automatización', 'Variadores', 'Interruptores']},
    {name: 'MLFB'}
  ];

  testExcel() {
    // this.excelService.exportAsExcelFile( auxExcel.createExcel(JSON.parse(this.infoReporte[0]['HojaTiempo'])) , 'TEST');
    this.excelService.exportAsExcelFile( auxExcel.createExcel({'key': 'value', 'key2': 'value2'}) , 'TEST');
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
    var params = {tipo: "", nombre: "", mlfb: ""};
    for(let x of event['criteria']) { 
      if( x['name'] == 'equipment-type' ) params['tipo'] = String(this.translateTipoEquipoNumero(x['value']));
      if( x['name'] == 'company' ) params['nombre'] = x['value'];
      if( x['name'] == 'MLFB' ) params['mlfb'] = x['value'];
    }
    this.dataRetriever.postData(env.url + '/api/getEquipmentsBy/', JSON.stringify(params)).then( data => {
      this.loading = false;
      this.resultados.next(data);
      console.log(this.resultados)      
    } );
  }

  treeViewItems: TreeItem[] = [
    new TreeItem('item 1', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 2', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 3', TreeItemFolderState.Collapsed, undefined, [])
  ];

  constructor( private dataRetriever: DataRetrieverService, private excelService: ExcelService ) { }

  ngOnInit() {
    this.firstSearch.next(true);
    this.loading = false;
  }

}
