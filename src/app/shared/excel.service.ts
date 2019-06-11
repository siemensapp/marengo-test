import { Injectable } from '@angular/core';
import {saveAs} from 'file-saver';
import * as auxExcel from '../../assets/js/createExcel';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {

HojaTiempo = {
  "2019-05-14": {
      "desde": "07:00",
      "fecha": "2019-05-14",
      "hasta": "20:00",
      "descuento": "00:00",
      "tiempoViaje": "01:00",
      "tiempoEspera": "00:00",
      "entrenamiento": "00:00",
      "servicioSitio": "10:00"
  },
  "2019-05-15": {
      "desde": "07:30",
      "fecha": "2019-05-15",
      "hasta": "20:30",
      "descuento": "01:00",
      "tiempoViaje": "01:00",
      "tiempoEspera": "00:30",
      "entrenamiento": "00:00",
      "servicioSitio": "10:00"
  }
}


constructor() { }
// public exportAsExcelFile(json: any[], excelFileName: string): void {
public exportAsExcelFile(excelFileName: string): void {
  console.log(XLSX.version);
  // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelBuffer: any = XLSX.write(auxExcel.createExcel( this.HojaTiempo ), { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   saveAs.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}
}