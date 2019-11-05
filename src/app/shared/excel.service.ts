import { Injectable } from '@angular/core';
import {saveAs} from 'file-saver';
import * as auxExcel from '../../assets/js/createExcel';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {

HojaTiempo = {
  "2019-06-22": {
      "desde": "07:00",
      "fecha": "2019-06-22",
      "hasta": "20:00",
      "descuento": "00:00",
      "tiempoViaje": "01:00",
      "tiempoEspera": "00:00",
      "entrenamiento": "00:00",
      "servicioSitio": "10:00"
  },
  "2019-06-23": {
      "desde": "07:30",
      "fecha": "2019-06-23",
      "hasta": "20:30",
      "descuento": "01:00",
      "tiempoViaje": "01:00",
      "tiempoEspera": "00:30",
      "entrenamiento": "00:00",
      "servicioSitio": "10:00"
  },
  "2019-01-01": {
    "desde": "07:30",
    "fecha": "2019-01-01",
    "hasta": "20:30",
    "descuento": "01:00",
    "tiempoViaje": "01:00",
    "tiempoEspera": "00:30",
    "entrenamiento": "00:00",
    "servicioSitio": "10:00"
  },
  "2019-06-20": {
    "desde": "07:30",
    "fecha": "2019-06-20",
    "hasta": "20:30",
    "descuento": "01:00",
    "tiempoViaje": "01:00",
    "tiempoEspera": "00:30",
    "entrenamiento": "00:00",
    "servicioSitio": "10:00"
},"2019-11-04": {
  "desde": "07:30",
  "fecha": "2019-11-04",
  "hasta": "20:30",
  "descuento": "01:00",
  "tiempoViaje": "01:00",
  "tiempoEspera": "00:30",
  "entrenamiento": "00:00",
  "servicioSitio": "10:00"
},
}


constructor() { }
// public exportAsExcelFile(json: any[], excelFileName: string): void {
public exportAsExcelFile(excelFileName: string, HojaTiempo:JSON, costoServicio, costoViaje): void {
  const excelBuffer: any = XLSX.write(auxExcel.createExcel( HojaTiempo, costoServicio, costoViaje ), { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   saveAs.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}
}