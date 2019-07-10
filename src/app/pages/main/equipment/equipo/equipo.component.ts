import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataRetrieverService } from '../../services/data-retriever.service';
import { Subject } from 'rxjs';
import * as pdf from '../../../../../assets/js/createReportPdf';
import * as env from '../../../../../assets/js/variables';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
