import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class DataRetrieverService {
  private infoSource= new BehaviorSubject("");
  private fechaSource = new BehaviorSubject("");
  private coordsSource= new BehaviorSubject([]);
  private especialistaSource = new BehaviorSubject({});
  private dateSource = new BehaviorSubject("");
  finalCoords = this.coordsSource.asObservable();
  infoFecha = this.fechaSource.asObservable();
  infoUbicacion = this.infoSource.asObservable();
  infoEspecialista = this.especialistaSource.asObservable();
  fechaCoordenadas = this.dateSource.asObservable();
  constructor( private http: HttpClient){ }

  obtenerCoordsPorFecha(fecha: string){
    this.dateSource.next(fecha);
  }
  
  obtenerFecha(fecha: string){
    this.fechaSource.next(fecha);
    console.log(this.fechaSource.value);
  }

  getData( url: string ) {
    return new Promise(resolve => {
      this.http.get(url)
        .map(results => results)
        .subscribe(data => {
          resolve(data);
        })
    })
  }

  postData( url: string, dataToSend: string ) {
    return new Promise( resolve => {
      this.http.post( url, JSON.parse(dataToSend) ).map( result => result).subscribe(dataReceived => {
        resolve(dataReceived);
      })
    })
  }

  obtenerUbicacion(coordenadas: string){
    this.infoSource.next(coordenadas);
    let aux = this.infoSource.value.split(",");
    this.coordsSource.next([ String(aux[1] + "," + aux[0]), aux[2], aux[3]  ]);
    console.log(this.coordsSource.value);
  }

  borrarEspecialista(url: string)
  {
    return new Promise(resolve => {
      this.http.get(url)
        .map(results => results)
        .subscribe(data => {
          resolve(data);
        })
    })
  }
  
  

  getEspecialista(info: JSON){
    this.especialistaSource.next(info);
  }
}