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
        let f = new Date(horas[records]['fecha']);
        

        let cellFecha = XLSX.utils.encode_cell({c: 0, r: i}) 
        let cellTipo = XLSX.utils.encode_cell({c: 2, r: i})
        let cellDesde = XLSX.utils.encode_cell({c: 3, r: i})
        let cellHasta = XLSX.utils.encode_cell({c: 4, r: i})
        let cellDescuento = XLSX.utils.encode_cell({c: 5, r: i})
        let cellPrimeraOperacion = XLSX.utils.encode_cell({c:6, r:i});
        let cellSegundaOperacion = XLSX.utils.encode_cell({c:7, r:i});
        let cellTerceraOperacion = XLSX.utils.encode_cell({c:8, r:i});
        let cellCuartaOperacion = XLSX.utils.encode_cell({c:9, r:i});
        let cellQuintaOperacion = XLSX.utils.encode_cell({c:10, r:i});
        let cellHND = XLSX.utils.encode_cell({c:11, r:i})
        let cellHED = XLSX.utils.encode_cell({c:12, r:i})
        let cellHEN = XLSX.utils.encode_cell({c:13, r:i})
        let cellHEDF = XLSX.utils.encode_cell({c:14, r:i})
        let cellHENF = XLSX.utils.encode_cell({c:15, r:i})
        let cellHET = XLSX.utils.encode_cell({c:16, r:i})
        
        let cellNine = XLSX.utils.encode_cell({c:0, r:9})
        let cellSix = XLSX.utils.encode_cell({c:0, r:10})
        let cellTwentyOne = XLSX.utils.encode_cell({c:0, r:11})

        let fechaCompleta = new Date(horas[records]['fecha']).toISOString().split("T")[0];
        console.log('Fecha Completa: ', fechaCompleta)
        let aux = {
            //Fecha: String(String(fechaCompleta).split("/")[2] + '-' + String(fechaCompleta).split("/")[1] + '-' + String(fechaCompleta).split("/")[0]),
            Fecha: {v: fechaCompleta, z:'d-mmm-yy', s:{fill: {fgColor:{rgb:'000000'}}}},
            Dia: dayNames[(f.getDay() + 1) % 7],
            /**
             * Si es sabado el tipo es 1
             * Si es domingo el tipo es 2 
             * Si es festivo el tipó es 3
             * Si es dia normal el tipo es '-'
             * Si no es un numero el tipo es "" 
             */
            Tipo: {f:'IF(ISTEXT(' + cellFecha + '),IF(ISNA(VLOOKUP(' + cellFecha + ',Festivos!B:B,1,FALSE)),IF(WEEKDAY(' + cellFecha + ',2)=6,1,IF(WEEKDAY(' + cellFecha + ',2)=7,2,"-")),3),"")'},
            Desde: horas[records]['desde'],
            Hasta: horas[records]['hasta'],
            Descuento: horas[records]['descuento'],
            PrimeraOperacion: {f: cellHasta+'-'+cellDesde+'-'+cellDescuento, z: 'h:mm'},
            SegundaOperacion: {f: "IF(HOUR(" + cellHasta + ")>=HOUR(" + cellSix + "),IF(HOUR(" + cellDesde + ")<HOUR(" + cellSix + ")," + cellSix + "-" + cellDesde + ",0),0)", z: 'h:mm'},
            TerceraOperacion: {f: "IF(HOUR(" + cellDesde + ")<=HOUR(" + cellTwentyOne + "),IF(HOUR(" + cellHasta + ")>HOUR(" + cellTwentyOne + ")," + cellHasta + "-" + cellTwentyOne + ",0),0)", z: 'h:mm'},
            CuartaOperacion: {f: "IF(OR(HOUR(" + cellHasta + ")<HOUR(" + cellSix + "),HOUR(" + cellDesde + ")>HOUR(" + cellTwentyOne + "))," + cellPrimeraOperacion + ",0)", z: 'h:mm'},
            QuintaOperacion: {f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellPrimeraOperacion + "," + cellPrimeraOperacion + " - " + cellSegundaOperacion + " - " + cellTerceraOperacion + " - " + cellCuartaOperacion + ")", z: 'h:mm'},
            HND: {f:"IF(AND(" + cellTipo + ">0," + cellTipo + "<4),0,IF(HOUR(" + cellQuintaOperacion + ")>HOUR(" + cellNine + ")," + cellNine + "," + cellQuintaOperacion + "))", z:'h:mm'},
            HED : {f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4),0,IF(HOUR(" + cellQuintaOperacion + ")>HOUR(" + cellHND + ")," + cellQuintaOperacion + "-" + cellHND + ",0))", z:'h:mm'},
            HEN : {f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4),0," + cellSegundaOperacion + " + " + cellTerceraOperacion + " + " + cellCuartaOperacion + ")", z: 'h:mm'},
            HEDF : {f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellQuintaOperacion + "- " + cellSegundaOperacion + "- " + cellTerceraOperacion + "- " + cellCuartaOperacion + ",0)", z: 'h:mm'},
            HENF : {f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellSegundaOperacion + "+" + cellTerceraOperacion + "+" + cellCuartaOperacion + ",0)", z: 'h:mm'},
            HET : {f: cellHED + "+" + cellHEN + "+" + cellHEDF + "+" + cellHENF, z:'h:mm'},
            SUMA : {f: cellHND + " +" + cellHET, z:'h:mm'} 
        }
        console.log(aux);
        rows.push(aux);
        i=i+1;
    })
    var horasSheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_json(horasSheet, [{nine:{v: '9:00'}}], {origin: "A10", skipHeader: true});
    XLSX.utils.sheet_add_json(horasSheet, [{six:{v: '6:00'}}], {origin: "A11", skipHeader: true});
    XLSX.utils.sheet_add_json(horasSheet, [{twentyOne:{v: '21:00'}}], {origin: "A12", skipHeader: true});

    horasSheet['!cols'] = [
        {wch:10},
        {wch: 3},
        {wch: 4},
        {wch: 5},
        {wch: 5},
        {wch: 9},
        {wch: 5, hidden: true},
        {wch: 5, hidden: true},
        {wch: 5, hidden: true},
        {wch: 5, hidden: true},
        {wch: 5, hidden: true},
        {wch: 5},
        {wch: 5},
        {wch: 5},
        {wch: 5},
        {wch: 5},
        {wch: 5},
        {wch: 5},
    ]

    XLSX.utils.book_append_sheet(workbook, horasSheet, 'REPORTE DE HORAS');
}

export function createFestivosSheet( fechaReporte ) {
    var fecha = new Date( fechaReporte );
    var tablaFestivos = [];
    var fechas = holidays.getColombiaHolidaysByYear( fecha.getFullYear() );
    
    for(var i = 0; i < fechas.length; i++) {
        //let fechaFormato = String(fechas[i]['holiday']).split("-")[2]+'/'+String(fechas[i]['holiday']).split("-")[1]+'/'+String(fechas[i]['holiday']).split("-")[0];
        let aux = {
            indice: i + 1,
            Festivo: {v: fechas[i]['holiday'], z:'d-mmm-yy'},
            Fiesta: fechas[i]['celebration']
        }
        tablaFestivos.push(aux);
    }
    console.log(tablaFestivos);
    var festivosSheet = XLSX.utils.json_to_sheet(tablaFestivos);
    XLSX.utils.book_append_sheet(workbook, festivosSheet, 'Festivos');
    //return workbook;
}

export function createExcel( HojaTiempo ) {
    createFestivosSheet(Object.keys(HojaTiempo)[0]);
    createReporteHorasSheet( HojaTiempo );
    return workbook;
}