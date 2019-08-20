/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {loadModules} from 'esri-loader';
import {DataRetrieverService} from '../../services/data-retriever.service';
import * as env from '../../../../../assets/js/variables';
import esri = __esri; // Esri TypeScript Types
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  //template: '<app-asignacion [coordenadasSitio]=coordenadasSitio><app-asignacion>',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoadedEvent = new EventEmitter < boolean > ();

  // The <div> where we will place the map
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array < number > = [0.1278, 51.5074];
  private _basemap = 'streets';
  private _loaded = false;
  private dataMarkers = {};
  private workers = {};


  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array < number > ) {
    this._center = center;
  }

  get center(): Array < number > {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }


  constructor(private dataRetriever: DataRetrieverService) {}


  preparePoints(data) {
    console.log("*********DATA");
    console.log(data);
    let points = [];
    for (let x of data) {
      // Extract data
      let auxJson = {};
      let nombre = x.NombreE;
      let iniciales = nombre.split(" ");
      let coords = x.CoordenadasEspecialista.split(",");
      let latitude = coords[1];
      let longitude = coords[0];
      auxJson["nombre"] = {nombre: nombre};
      auxJson["pointMap"] = {
        type: "point",
        longitude: longitude,
        latitude: latitude
      };
      auxJson["markerSymbol"] = {
        type: "simple-marker",
        color: [226, 119, 40],
        size: "25px",
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
      auxJson["markerSymbol2"] = {
        type: "simple-marker",
        color: [255, 255, 255],
        size: "40px",
        outline: {
          color: [227, 102, 0],
          width: 3
        }
      };

      auxJson["textSymbol"] = {
        type: "text",
        text: iniciales.length == 4 ? String(iniciales[0][0] + iniciales[2][0]) : String(iniciales[0][0] + iniciales[1][0])
      };
      points.push(auxJson);
    }
    return points;
  }

  async prepareWorkers(fecha: string) {
    if(this.nuevaFecha==""){
      this.nuevaFecha=new Date().toISOString().split("T")[0];
    }
    let results = await this.dataRetriever.getData(env.url + "/api/workers/"+this.nuevaFecha);
    return this.preparePoints(results);
  }

  setUbicacion(coords: string) {
    this.dataRetriever.obtenerUbicacion(coords);
  }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, Point, Graphic, Search] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/geometry/Point",
        "esri/Graphic",
        "esri/widgets/Search"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      // Se crea la vista del mapa
      let view = new EsriMapView(mapViewProperties)
      // Se agrega a la vista
      let points = await this.prepareWorkers("");
      for (let x of points) {
        if(x.pointMap.longitude !== ""){
        console.log(x);
        view.graphics.add(
          new Graphic({
            geometry: x.pointMap,
            symbol: x.markerSymbol2,
            popupTemplate: {
              title: x.nombre.nombre,
              content: "Servicio de Field Service<br>[ " + x.pointMap.longitude + ", " + x.pointMap.latitude + " ]<br>"
            }
          })
        );
        view.graphics.add(
          new Graphic({
            geometry: x.pointMap,
            symbol: x.textSymbol,
            popupTemplate: {
              title: x.nombre.nombre,
              content: "Servicio de Field Service<br>[ " + x.pointMap.longitude + ", " + x.pointMap.latitude + " ]<br>"
            }
          })
        );
        }
      }

      var busqueda = new Search({
        view : view
      })
   
      
      
      busqueda.on("select-result", (event) => {
        var coordenadasSitio = String(event.result.feature.geometry.latitude + "," + event.result.feature.geometry.longitude + "," + event.result.name + ","+event.result.feature.attributes.City);
        this.setUbicacion(coordenadasSitio);
      })

      view.ui.add(busqueda, "top-right");
      

      return view;

    } catch (error) {
      console.log('EsriLoader: ', error);
    }

  }

  // Finalize a few things once the MapView has been loaded
  houseKeeping(mapView) {
    mapView.when(() => {
      console.log('mapView ready: ', mapView.ready);
      this._loaded = mapView.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  infoUbicacion="";
  nuevaFecha="";

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.dataRetriever.infoUbicacion.subscribe(infoUbicacion => this.infoUbicacion = infoUbicacion);
    this.dataRetriever.fechaCoordenadas.subscribe(fecha => {this.nuevaFecha = fecha; this.initializeMap()});
    this.initializeMap().then((mapView) => {
      this.houseKeeping(mapView);
    });
  }

}