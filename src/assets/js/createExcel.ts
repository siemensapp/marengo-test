import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const holidays = require('colombia-holidays');

//const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

var workbook = XLSX.utils.book_new();
var dayNames = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];


export function createReporteHorasSheet ( horas ) {
    var rows = [];
    var i = 1;
    Object.keys(horas).forEach( (records) => {
        //let sum = String('SUM(B' + currentRow + ',C' + currentRow +')');

        let f = new Date(horas[records]['fecha']);

        let cellFecha = XLSX.utils.encode_cell({c: 0, r: i}) 
        let cellTipo = XLSX.utils.encode_cell({c: 2, r: i})
        let cellDesde = XLSX.utils.encode_cell({c: 3, r: i})
        let cellHasta = XLSX.utils.encode_cell({c: 4, r: i})
        let cellDescuento = XLSX.utils.encode_cell({c: 5, r: i})
        let fechaCompleta = new Date(horas[records]['fecha']);
        let aux = {
            Fecha: fechaCompleta,
            Dia: dayNames[f.getDay()],
            /**
             * Si es sabado el tipo es 1
             * Si es domingo el tipo es 2 
             * Si es festivo el tipó es 3
             * Si es dia normal el tipo es '-'
             * Si no es un numero el tipo es "" 
             */
            Tipo: {f:'IF(ISNUMBER('+cellFecha+'),IF(ISNA(VLOOKUP('+cellFecha+',Festivo,1,FALSE)),IF(WEEKDAY('+cellFecha+',2)=6,1,IF(WEEKDAY('+cellFecha+',2)=7,2,"-")),3),"")'},
            Desde: horas[records]['desde'],
            Hasta: horas[records]['hasta'],
            Descuento: horas[records]['descuento'],
            PrimeraOperacion: {f: cellHasta+'-'+cellDesde+'-'+cellDescuento, z: 'h:mm'}
        }
        console.log(aux);
        rows.push(aux);
        i=i+1;
    })
    var horasSheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, horasSheet, 'REPORTE DE HORAS');
}

export function createFestivosSheet( fechaReporte ) {
    var fecha = new Date( fechaReporte );
    var tablaFestivos = [];
    var fechas = holidays.getColombiaHolidaysByYear( fecha.getFullYear() );
    
    for(var i = 0; i < fechas.length; i++) {
        let fechaFormato = String(fechas[i]['holiday']).split("-")[2]+'/'+String(fechas[i]['holiday']).split("-")[1]+'/'+String(fechas[i]['holiday']).split("-")[0];
        let aux = {
            indice: i + 1,
            Festivo: {v: fechaFormato, t:"d"},
            Fiesta: fechas[i]['celebration']
        }
        tablaFestivos.push(aux);
    }
    var festivosSheet = XLSX.utils.json_to_sheet(tablaFestivos);
    XLSX.utils.book_append_sheet(workbook, festivosSheet, 'Festivos');
    //return workbook;
}

export function createExcel( HojaTiempo ) {
    createFestivosSheet(Object.keys(HojaTiempo)[0]);
    createReporteHorasSheet( HojaTiempo );
    return workbook;
}