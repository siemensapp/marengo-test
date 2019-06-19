import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { Subject } from 'rxjs';
import * as pdf from '../../../../../assets/js/createReportPdf';
import * as env from '../../../../../assets/js/variables';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  private searchTerm;
  reportes = new Subject();
  cv;

  constructor(private route: ActivatedRoute, private dataRetriever: DataRetrieverService) { }
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

  clientLogo() {
    return "../../../../../assets/images/logos/" + env.empresasLogos[this.cv['NombreEmpresa']] +"-logo.png"
  }

  showReport( jsonReport ) {
    console.log(jsonReport);
    pdf.createPDF(jsonReport);
  }

  getReportsData() {
    this.dataRetriever.getData(env.url + '/api/getReportsFromEquipment/' + this.searchTerm).then( results => {
      this.reportes.next(results);
    });
  }

  getEquipmentData() {
    this.dataRetriever.getData(env.url + '/api/getEquipmentBySerial/' + this.searchTerm).then( results => {
      this.cv = results[0];
      this.cv['AnnosOperacion'] = this.cv['AñosOperacion'];
    });
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.getEquipmentData();
    this.getReportsData();
  }

}
