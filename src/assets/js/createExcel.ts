import * as XLSX from 'xlsx';
const holidays = require('colombia-holidays');

//const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

var workbook = XLSX.utils.book_new();
var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

var f;
var cellFecha;
var cellTipo;
var cellDesde;
var cellHasta;
var cellDescuento;
var cellPrimeraOperacion;
var cellSegundaOperacion;
var cellTerceraOperacion;
var cellCuartaOperacion;
var cellQuintaOperacion;
var cellHND;
var cellHED;
var cellHEN;
var cellHEDF;
var cellHENF;
var cellHET;
var cellHoraTipo;
var cellSuma;

var cellNine;
var cellSix;
var cellTwentyOne;

var fechaCompleta;

function createHorasGeneralRow(desde, hasta, descuento, tipo) {
  return {
    
    FECHA: {
      v: fechaCompleta,
      z: 'd-mmm-yy'
    },
    DIA: dayNames[(f.getDay() + 1) % 7],
    /**
     * Si es sabado el tipo es 1
     * Si es domingo el tipo es 2 
     * Si es festivo el tipó es 3
     * Si es dia normal el tipo es '-'
     * Si no es un numero el tipo es "" 
     */
    TIPO: {
      f: 'IF(ISTEXT(' + cellFecha + '),IF(ISNA(VLOOKUP(' + cellFecha + ',Festivos!B:B,1,FALSE)),IF(WEEKDAY(' + cellFecha + ',2)=6,1,IF(WEEKDAY(' + cellFecha + ',2)=7,2,"-")),3),"")'
    },
    DESDE: desde,
    HASTA: hasta,
    DESCUENTO: descuento,
    PrimeraOperacion: {
      f: cellHasta + '-' + cellDesde + '-' + cellDescuento,
      z: '[hh]:mm'
    },
    SegundaOperacion: {
      f: "IF(HOUR(" + cellHasta + ")>=HOUR(" + cellSix + "),IF(HOUR(" + cellDesde + ")<HOUR(" + cellSix + ")," + cellSix + "-" + cellDesde + ",0),0)",
      z: '[hh]:mm'
    },
    TerceraOperacion: {
      f: "IF(HOUR(" + cellDesde + ")<=HOUR(" + cellTwentyOne + "),IF(HOUR(" + cellHasta + ")>HOUR(" + cellTwentyOne + ")," + cellHasta + "-" + cellTwentyOne + ",0),0)",
      z: '[hh]:mm'
    },
    CuartaOperacion: {
      f: "IF(OR(HOUR(" + cellHasta + ")<HOUR(" + cellSix + "),HOUR(" + cellDesde + ")>HOUR(" + cellTwentyOne + "))," + cellPrimeraOperacion + ",0)",
      z: '[hh]:mm'
    },
    TiempoTranscurrido: {
      f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellPrimeraOperacion + "," + cellPrimeraOperacion + " - " + cellSegundaOperacion + " - " + cellTerceraOperacion + " - " + cellCuartaOperacion + ")",
      z: '[hh]:mm'
    },
    HND: {
      f: "IF(AND(" + cellTipo + ">0," + cellTipo + "<4),0,IF(HOUR(" + cellQuintaOperacion + ")>HOUR(" + cellNine + ")," + cellNine + "," + cellQuintaOperacion + "))",
      z: '[hh]:mm'
    },
    HED: {
      f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4),0,IF(HOUR(" + cellQuintaOperacion + ")>HOUR(" + cellHND + ")," + cellQuintaOperacion + "-" + cellHND + ",0))",
      z: '[hh]:mm'
    },
    HEN: {
      f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4),0," + cellSegundaOperacion + " + " + cellTerceraOperacion + " + " + cellCuartaOperacion + ")",
      z: '[hh]:mm'
    },
    HEDF: {
      f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellQuintaOperacion + "- " + cellSegundaOperacion + "- " + cellTerceraOperacion + "- " + cellCuartaOperacion + ",0)",
      z: '[hh]:mm'
    },
    HENF: {
      f: "IF(AND(" + cellTipo + ">1," + cellTipo + "<4)," + cellSegundaOperacion + "+" + cellTerceraOperacion + "+" + cellCuartaOperacion + ",0)",
      z: '[hh]:mm'
    },
    HET: {
      f: cellHED + "+" + cellHEN + "+" + cellHEDF + "+" + cellHENF,
      z: '[hh]:mm'
    },
    SUMA: {
      f: cellHND + " +" + cellHET,
      z: '[hh]:mm'
    },
    TIPOSERVICIO: tipo
  }
}

export function createReporteHorasSheet(horas, costoServicio, costoViaje) {
  var rows = [];
  var i = 1;
  Object.keys(horas).forEach((records) => {
    f = new Date(horas[records]['fecha']);

    cellFecha = XLSX.utils.encode_cell({
      c: 0,
      r: i
    })
    cellTipo = XLSX.utils.encode_cell({
      c: 2,
      r: i
    })
    cellDesde = XLSX.utils.encode_cell({
      c: 3,
      r: i
    })
    cellHasta = XLSX.utils.encode_cell({
      c: 4,
      r: i
    })
    cellDescuento = XLSX.utils.encode_cell({
      c: 5,
      r: i
    })
    cellPrimeraOperacion = XLSX.utils.encode_cell({
      c: 6,
      r: i
    });
    cellSegundaOperacion = XLSX.utils.encode_cell({
      c: 7,
      r: i
    });
    cellTerceraOperacion = XLSX.utils.encode_cell({
      c: 8,
      r: i
    });
    cellCuartaOperacion = XLSX.utils.encode_cell({
      c: 9,
      r: i
    });
    cellQuintaOperacion = XLSX.utils.encode_cell({
      c: 10,
      r: i
    });
    cellHND = XLSX.utils.encode_cell({
      c: 11,
      r: i
    })
    cellHED = XLSX.utils.encode_cell({
      c: 12,
      r: i
    })
    cellHEN = XLSX.utils.encode_cell({
      c: 13,
      r: i
    })
    cellHEDF = XLSX.utils.encode_cell({
      c: 14,
      r: i
    })
    cellHENF = XLSX.utils.encode_cell({
      c: 15,
      r: i
    })
    cellHET = XLSX.utils.encode_cell({
      c: 16,
      r: i
    })
    cellSuma = XLSX.utils.encode_cell({
      c: 17,
      r: i
    })

    cellNine = XLSX.utils.encode_cell({
      c: 22,
      r: 1
    })
    cellSix = XLSX.utils.encode_cell({
      c: 22,
      r: 2
    })
    cellTwentyOne = XLSX.utils.encode_cell({
      c: 22,
      r: 3
    })
    cellHoraTipo = XLSX.utils.encode_cell({
        c: 18,
        r: 1
    })
    // console.log('horas[records]["fecha"] : ', new Date('2019-06-14').toISOString());
    // fechaCompleta = new Date(horas[records]['fecha']).toISOString().split("T")[0];
    // fechaCompleta = new Date(horas[records]['fecha']);
    fechaCompleta = horas[records]['fecha'];


    if ((horas[records]['servicioSitio'] == "" || horas[records]['servicioSitio'] == "00:00") && (horas[records]['tiempoViaje'] !== "" || horas[records]['tiempoViaje'] !== "00:00")) {
      let desde = horas[records]['desde'];
      let hasta = horas[records]['hasta'];
      rows.push(createHorasGeneralRow(desde, hasta, 0, 'Viaje'));
      i = i + 1;
    } else if ((horas[records]['tiempoViaje'] == "" || horas[records]['tiempoViaje'] == "00:00") && (horas[records]['servicioSitio'] !== "" || horas[records]['servicioSitio'] !== "00:00")) {
      let desde = horas[records]['desde'];
      let hasta = horas[records]['hasta'];
      let descuento = horas[records]['descuento'];
      rows.push(createHorasGeneralRow(desde, hasta, descuento, 'Servicio'));
      i = i + 1;
    } else {
      let desde = horas[records]['desde'];
      let hasta = horas[records]['hasta'];
      let horasViaje = horas[records]['tiempoViaje'];
      let descuento = horas[records]['descuento'];
      let auxTiempoFin = new Date();
      auxTiempoFin.setHours(parseInt(desde.split(':')[0]) + parseInt(horasViaje.split(':')[0]));
      auxTiempoFin.setMinutes(parseInt(desde.split(':')[1]) + parseInt(horasViaje.split(':')[1]));
      console.log(auxTiempoFin);
      let auxHoraFin = String((auxTiempoFin.getHours() < 10 ? '0' + auxTiempoFin.getHours() : auxTiempoFin.getHours()) + ':' + (auxTiempoFin.getMinutes() < 10 ? '0' + auxTiempoFin.getMinutes() : auxTiempoFin.getMinutes()));
      rows.push(createHorasGeneralRow(desde, auxHoraFin, '00:00', 'Viaje'));
      cellFecha = XLSX.utils.encode_cell({c: 0, r: i + 1})
      cellTipo = XLSX.utils.encode_cell({c: 2, r: i + 1})
      cellDesde = XLSX.utils.encode_cell({c: 3, r: i + 1})
      cellHasta = XLSX.utils.encode_cell({c: 4, r: i + 1})
      cellDescuento = XLSX.utils.encode_cell({c: 5, r: i + 1})
      cellPrimeraOperacion = XLSX.utils.encode_cell({c: 6, r: i + 1});
      cellSegundaOperacion = XLSX.utils.encode_cell({c: 7, r: i + 1});
      cellTerceraOperacion = XLSX.utils.encode_cell({c: 8, r: i + 1});
      cellCuartaOperacion = XLSX.utils.encode_cell({c: 9, r: i + 1});
      cellQuintaOperacion = XLSX.utils.encode_cell({c: 10, r: i + 1});
      cellHND = XLSX.utils.encode_cell({c: 11, r: i + 1})
      cellHED = XLSX.utils.encode_cell({c: 12, r: i + 1})
      cellHEN = XLSX.utils.encode_cell({c: 13, r: i + 1})
      cellHEDF = XLSX.utils.encode_cell({c: 14, r: i + 1})
      cellHENF = XLSX.utils.encode_cell({c: 15, r: i + 1})
      cellHET = XLSX.utils.encode_cell({c: 16, r: i + 1})
      cellSuma = XLSX.utils.encode_cell({c: 17, r: i + 1})
      rows.push(createHorasGeneralRow(auxHoraFin, hasta, descuento, 'Servicio'));
      i=i+2;
    }
  })
  console.log('rows : ', rows);
  var horasSheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_json(horasSheet, [{nine: {f: '"09:00" + 0', z: '[hh]:mm'}}], {origin: "W2", skipHeader: true});
  XLSX.utils.sheet_add_json(horasSheet, [{six: {f: '"06:00" + 0', z: '[hh]:mm'}}], {origin: "W3", skipHeader: true});
  XLSX.utils.sheet_add_json(horasSheet, [{twentyOne: {f: '"21:00" + 0', z: '[hh]:mm'}}], {origin: "W4", skipHeader: true});
  i=i+2;
  var finHoraTipo = 'S' + (i-2);
  XLSX.utils.sheet_add_json(horasSheet, 
    [
        {
            HORAS: 'Total Horas Servicio', 
            HND: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",L2:'+cellHND+')', z: '[hh]:mm'},
            HED: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",M2:'+cellHED+')', z: '[hh]:mm'},
            HEN: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",N2:'+cellHEN+')', z: '[hh]:mm'},
            HEDF: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",O2:'+cellHEDF+')', z: '[hh]:mm'},
            HENF: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",P2:'+cellHENF+')', z: '[hh]:mm'},
            HET: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",Q2:'+cellHET+')', z: '[hh]:mm'},
            SUMA: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Servicio",R2:'+cellSuma+')', z: '[hh]:mm'}
        }
    ], {origin: "K"+i, skipHeader: true});
  i=i+1;
  XLSX.utils.sheet_add_json(horasSheet, 
    [
        {
            HORAS: 'Total Horas Viaje', 
            HND: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",L2:'+cellHND+')', z: '[hh]:mm'},
            HED: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",M2:'+cellHED+')', z: '[hh]:mm'},
            HEN: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",N2:'+cellHEN+')', z: '[hh]:mm'},
            HEDF: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",O2:'+cellHEDF+')', z: '[hh]:mm'},
            HENF: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",P2:'+cellHENF+')', z: '[hh]:mm'},
            HET: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",Q2:'+cellHET+')', z: '[hh]:mm'},
            SUMA: {f: 'SUMIF('+cellHoraTipo+':'+finHoraTipo+',"Viaje",R2:'+cellSuma+')', z: '[hh]:mm'}
        }
    ], {origin: "K"+i, skipHeader: true});
  i=i+4;
  var cellHNDHS = 'L'+(i-5);
  var cellHNDHV = 'L'+(i-4);

  var cellHEDHS = 'M'+(i-5);
  var cellHEDHV = 'M'+(i-4);

  var cellHENHS = 'N'+(i-5);
  var cellHENHV = 'N'+(i-4);

  var cellHEDFHS = 'O'+(i-5);
  var cellHEDFHV = 'O'+(i-4);

  var cellHENFHS = 'P'+(i-5);
  var cellHENFHV = 'P'+(i-4);

  var cellHNDNueva = 'L'+(i+5);
  var cellHEDNueva = 'M'+(i+5);
  XLSX.utils.sheet_add_json(horasSheet, 
    [
        {HORAS: 'Horas Normales', SERVICIO: {f : cellHNDHS+'*24', z: '#,##0.00'}, VIAJE: {f: cellHNDHV+'*24', z:'0'}, MULTIPLICADOR: '1', PrecioHrServicio: costoServicio, PrecioHrViaje: costoViaje, TOTAL: {f : '(O'+(i+1)+'*L'+(i+1)+') + (P'+(i+1)+'*M'+(i+1)+')', z: '\$ #,#'}}, 
        {HORAS: 'Horas Extra Diurnas', SERVICIO: {f : cellHEDHS+'*24', z: '#,##0.00'}, VIAJE: {f: cellHEDHV+'*24', z:'0'}, MULTIPLICADOR: '1.25', PrecioHrServicio: {f: 'O'+(i+1)+'*N'+(i+2)}, PrecioHrViaje: costoViaje, TOTAL: {f : '(O'+(i+2)+'*L'+(i+2)+') + (P'+(i+2)+'*M'+(i+2)+')', z: '\$ #,#'}},
        {HORAS: 'Horas Extra Nocturnas', SERVICIO: {f : cellHENHS+'*24', z: '#,##0.00'}, VIAJE: {f: cellHENHV+'*24', z:'0'}, MULTIPLICADOR: '1.75', PrecioHrServicio: {f: 'O'+(i+1)+'*N'+(i+3)}, PrecioHrViaje: costoViaje, TOTAL: {f : '(O'+(i+3)+'*L'+(i+3)+') + (P'+(i+3)+'*M'+(i+3)+')', z: '\$ #,#'}},
        {HORAS: 'Horas Extra Diurnas Festivos', SERVICIO: {f : cellHEDFHS+'*24', z: '#,##0.00'}, VIAJE: {f: cellHEDFHV+'*24', z:'0'}, MULTIPLICADOR: '2', PrecioHrServicio: {f: 'O'+(i+1)+'*N'+(i+4)}, PrecioHrViaje: costoViaje, TOTAL: {f : '(O'+(i+4)+'*L'+(i+4)+') + (P'+(i+4)+'*M'+(i+4)+')', z: '\$ #,#'}},
        {HORAS: 'Horas Extra Nocturnas Festivos', SERVICIO: {f : cellHENFHS+'*24', z: '#,##0.00'}, VIAJE: {f: cellHENFHV+'*24', z:'0'}, MULTIPLICADOR: '2.50', PrecioHrServicio: {f: 'O'+(i+1)+'*N'+(i+5)}, PrecioHrViaje: costoViaje, TOTAL: {f : '(O'+(i+5)+'*L'+(i+5)+') + (P'+(i+5)+'*M'+(i+5)+')', z: '\$ #,#'}},
        {HORAS: 'TOTAL', SERVICIO: {f : 'SUM(L'+(i+1)+':'+cellHNDNueva+')', z: '#,##0.00'}, VIAJE : {f: 'SUM(M'+(i+1)+':'+cellHEDNueva+')', z:'0'}, MULTIPLICADOR: '', PrecioHrServicio: '', PrecioHrViaje: '', TOTAL: {f : 'SUM(Q'+(i+1)+':Q'+(i+5)+')', z: '\$ #,#'}}
    ], {origin: "K"+i});

  horasSheet['!cols'] = [{
      wch: 10
    },
    {
      wch: 3
    },
    {
      wch: 4
    },
    {
      wch: 5
    },
    {
      wch: 5
    },
    {
      wch: 9
    },
    {
      wch: 5,
      hidden: true
    },
    {
      wch: 5,
      hidden: true
    },
    {
      wch: 5,
      hidden: true
    },
    {
      wch: 5,
      hidden: true
    },
    {
      wch: 15,
      // hidden: true
    },
    {
      wch: 5
    },
    {
      wch: 5
    },
    {
      wch: 5
    },
    {
      wch: 10
    },
    {
      wch: 10
    },
    {
      wch: 10
    },
    {
      wch: 5
    },
  ]

  XLSX.utils.book_append_sheet(workbook, horasSheet, 'REPORTE DE HORAS');
}

export function createFestivosSheet(fechaReporte) {
  var fecha = new Date(fechaReporte);
  var tablaFestivos = [];
  var fechas = holidays.getColombiaHolidaysByYear(fecha.getFullYear());

  for (var i = 0; i < fechas.length; i++) {
    //let fechaFormato = String(fechas[i]['holiday']).split("-")[2]+'/'+String(fechas[i]['holiday']).split("-")[1]+'/'+String(fechas[i]['holiday']).split("-")[0];
    let aux = {
      indice: i + 1,
      Festivo: {
        v: fechas[i]['holiday'],
        z: 'd-mmm-yy'
      },
      Fiesta: fechas[i]['celebration']
    }
    tablaFestivos.push(aux);
  }
  console.log(tablaFestivos);
  var festivosSheet = XLSX.utils.json_to_sheet(tablaFestivos);
  XLSX.utils.book_append_sheet(workbook, festivosSheet, 'Festivos');
}

export function createExcel(HojaTiempo, costoServicio, costoViaje) {
  createReporteHorasSheet(HojaTiempo, costoServicio, costoViaje);
  createFestivosSheet(Object.keys(HojaTiempo)[0]);
  return workbook;
}
