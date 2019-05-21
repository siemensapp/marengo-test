import { Component, OnInit } from '@angular/core';
import { TreeItemFolderState, TreeItem, SiFilteredSearchModule } from '@simpl/marengo-ng';
import { DataRetrieverService } from '../../services/data-retriever.service';
import * as env from '../../../../../assets/variables';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  resultados = new Subject();
  firstSearch = new Subject();
  loading = new Subject();

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
    this.loading.next(true);
    this.firstSearch.next(false);
    console.log(event);
    var params = {tipo: "", nombre: "", mlfb: ""};
    for(let x of event['criteria']) { 
      if( x['name'] == 'equipment-type' ) params['tipo'] = String(this.translateTipoEquipoNumero(x['value']));
      if( x['name'] == 'company' ) params['nombre'] = x['value'];
      if( x['name'] == 'MLFB' ) params['mlfb'] = x['value'];
    }
    this.dataRetriever.postData(env.url + '/api/getEquipmentsBy/', JSON.stringify(params)).then( data => {
      this.loading.next(false);
      this.resultados.next(data);
      console.log(this.resultados)      
    } );
  }

  treeViewItems: TreeItem[] = [
    new TreeItem('item 1', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 2', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 3', TreeItemFolderState.Collapsed, undefined, [])
  ];

  constructor( private dataRetriever: DataRetrieverService ) { }

  ngOnInit() {
    this.firstSearch.next(true);
    this.loading.next(false);
  }

}
