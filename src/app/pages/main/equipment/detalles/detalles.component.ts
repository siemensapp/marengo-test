import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  reportes = new Subject();
  private searchTerm;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    console.log(this.searchTerm);
  }

}
