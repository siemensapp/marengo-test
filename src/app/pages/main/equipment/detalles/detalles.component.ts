import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { Subject } from 'rxjs';
import * as env from '../../../../../assets/variables';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  reportes = new Subject();

  constructor(private route: ActivatedRoute, private dataRetriever: DataRetrieverService) { }

  setFormData() {
    let searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.dataRetriever.getData(env.url + '/api/getReportsFromEquipment/' + searchTerm).then( results => {
      this.reportes.next(results);
      console.log(results);
    });
  }

  ngOnInit() {
    this.setFormData();
  }

}
