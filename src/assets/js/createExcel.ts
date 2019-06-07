export function createExcel ( horas ) {
    var rows = [];
    var i = 6;
    var currentRow = 2;
    Object.keys(horas).forEach( (records) => {
        let sum = String('SUM(B' + currentRow + ',C' + currentRow +')');
        let aux = {
            Fecha: records,
            Inicio: {t:'n', v: 4},
            Fin: {t:'n', v: i},
            HND: {t: 'n', f: sum }
        }
        i = i*2;
        currentRow++;
        rows.push(aux);
    })
    return rows;
}

