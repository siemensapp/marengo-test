import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../../services/data-retriever.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  infoEspecialista={};
  fechaNacimiento;
  constructor(private DataRetriever: DataRetrieverService) { }

  ngOnInit() {
    this.DataRetriever.infoEspecialista.subscribe(infoEspecialista => this.infoEspecialista = infoEspecialista);
    console.log("*****************");
    console.log(this.infoEspecialista['id']);
    console.log(this.infoEspecialista['email']);
    document.getElementById('fecha').innerHTML=this.infoEspecialista['FechaNacimiento'].split("T")[0];
  }

}