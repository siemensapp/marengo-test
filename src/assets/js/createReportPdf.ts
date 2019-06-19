import * as jsPDF from 'jspdf';

export function createPDF(reporte: {}){
    console.log('Report JSON:', reporte)
    var doc = new jsPDF();
    var logo = 'data:image/png;base64,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JEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJElSXP4/2MZkn07t8ggAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDItMjVUMDk6NTI6MzMrMDA6MDBUu1kGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAyLTA2VDEwOjA4OjE0KzAwOjAwI38raQAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi44LjktOSBRMTYgeDg2XzY0IDIwMTctMDctMzEgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmdTYVXGAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGXRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAyNDAwx8F5FAAAABh0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAyNDAw0oilDQAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTE3OTExNjk0Qn5hSQAAABN0RVh0VGh1bWI6OlNpemUANDUuNktCQrXzK3EAAABFdEVYdFRodW1iOjpVUkkAZmlsZTovLy9vcHQvcG5nX2JhdGNoXzEvc2llbWVucy0zLWxvZ28tcG5nLXRyYW5zcGFyZW50LnBuZ6Z/GFMAAAAASUVORK5CYII=';
    //LOGO SIEMENS
    doc.addImage(logo, 3, 0, 50, 35);
    doc.setFontSize(20);
    doc.setFontStyle("bold");
    doc.text(10, 30, "Reporte General de Servicio");

    //CONSECUTIVO Y FECHA
    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(120, 38, "Consecutivo");
    doc.text(85, 43, reporte['Consecutivo']);
    doc.rect(80, 35, 80, 10);    
    doc.text(175, 38, "Fecha");
    doc.rect(160, 35, 40, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(170, 43, reporte['FechaEnvio'].split("T")[0]);

    //TABLA DETALLES GENERALES DEL SERVICIO
    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(12, 53, "Cliente");
    doc.rect(10, 50, 130, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 57, reporte['NombreEmpresa']); 

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(142, 53, "Telefono");
    doc.rect(140, 50, 60, 10); 
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    // doc.text(20, 150, reporte['NombreCliente']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(12, 63, "Contacto");
    doc.rect(10, 60, 65, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 67, reporte['NombreContacto']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(77, 63, "Colaborador");
    doc.rect(75, 60, 65, 10);  
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(87, 67, reporte['NombreColaborador']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(142, 63, "No. De Pedido");
    doc.rect(140, 60, 60, 10); 
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    // doc.text(20, 150, reporte['NombreColaborador']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(12, 73, "Proyecto/Servicio");
    doc.rect(10, 70, 130, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 77, reporte['NombreProyecto']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(142, 73, "No. Orden de Servicio Interna");
    doc.rect(140, 70, 60, 10); 
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    // doc.text(20, 150, reporte['NombreProyecto']);

    //Descripcion del Alcance
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(75, 100, "Descripción del Alcance");
    doc.rect(10, 96, 190, 30);
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    var desc = reporte['DescripcionAlcance'];
    var lineasDesc = doc.splitTextToSize(desc, 186);
    doc.text(12, 110, lineasDesc);


    //TABLA DATOS TECNICOS (Condiciones del sistema/Estado inicial)
    doc.setFontSize(14);
    doc.setFontStyle("bold");
    doc.text(10, 145, "Datos Técnicos (Condiciones del Sistema/Estado Inicial)");

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(13, 153, "Marca");
    doc.rect(10, 150, 190, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 157, reporte['Marca']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(13, 163, "Denominación Interna - (Cliente)");
    doc.rect(10, 160, 190, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 167, reporte['DenominacionInterna']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(13, 173, "Product Number (P/N)/MLFB/ID");
    doc.rect(10, 170, 95, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 177, reporte['DenominacionInterna']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(108, 173, "Serial Number");
    doc.rect(105, 170, 95, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(115, 177, reporte['NumeroSerial']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(13, 183, "Características Técnicas");
    doc.rect(10, 180, 190, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 187, reporte['CaracteristicasTecnicas']);

    doc.setFontSize(8);
    doc.setFontStyle("normal");
    doc.text(13, 193, "Estado Inicial/Antecedentes");
    doc.rect(10, 190, 190, 10);
    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(20, 197, reporte['EstadoInicial']);
    
    //ACTIVIDADES REALIZADAS
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(75, 219, "Actividades Realizadas");
    doc.rect(10, 215, 190, 40);
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    var act = reporte['ActividadesRealizadas'];
    var lineasAct = doc.splitTextToSize(act, 186);
    doc.text(12, 229, lineasAct);

    //INSERTAR PAGINA NUEVA
    doc.insertPage();

    //CONCLUSIONES Y RECOMENDACIONES 
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(65, 24, "Conclusiones y Recomendaciones");
    doc.rect(10, 20, 190, 40);
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    var conc = reporte['Conclusiones'];
    var lineasConc = doc.splitTextToSize(conc, 186);
    doc.text(12, 34, lineasConc);

    //REPUESTOS SUGERIDOS
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(75, 74, "Repuestos Sugeridos");
    doc.rect(10, 70, 190, 40);
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    var repu = reporte['RepuestosSugeridos'];
    var lineasRepu = doc.splitTextToSize(repu, 186);
    doc.text(12, 84, lineasRepu);

    //ACTIVIDADES PENDIENTES
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(75, 124, "Actividades Pendientes");
    doc.rect(10, 120, 190, 40);
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    var actP = reporte['ActividadesPendientes'];
    var lineasActP = doc.splitTextToSize(actP, 186);
    doc.text(12, 134, lineasActP);

    // //Hoja de Tiempo
    doc.setFontSize(14);
    doc.setFontStyle("bold");
    doc.text(85, 180, "Hoja de Tiempo");
    doc.setFillColor(173,216,230);
    doc.setDrawColor(0,0,0);
    doc.rect(10, 185, 30, 20, 'FD');

    doc.rect(40, 185, 80, 10, 'FD');
    doc.rect(40, 195, 27, 10, 'FD');
    doc.rect(67, 195, 27, 10, 'FD');
    doc.rect(94, 195, 26, 10, 'FD');

    doc.rect(120, 185, 80, 10, 'FD');
    doc.rect(120, 195, 20, 10, 'FD');
    doc.rect(140, 195, 20, 10, 'FD');
    doc.rect(160, 195, 20, 10, 'FD');
    doc.rect(180, 195, 20, 10, 'FD');

    doc.setFontSize(10);
    doc.setFontStyle("normal");
    doc.text(19, 195, "Fecha");

    doc.text(65, 190, "Horas Trabajadas");
    doc.text(47, 200, "Desde");
    doc.text(75, 200, "Hasta");
    doc.text(97, 200, "Descuento");

    doc.text(145, 190, "Clase de Trabajo");
    doc.text(123, 200, "Servicio \nen Sitio");
    doc.text(143, 200, "Entrena- \nmiento");
    doc.text(161, 200, "T. de Viaje");
    doc.text(183, 200, "T. de \nEspera");

    doc.setFillColor(255,255,255);

    var y=205;
    var hojaDeTiempo = JSON.parse(reporte['HojaTiempo']);
    Object.keys(hojaDeTiempo).forEach(key => {
      if(y>220){
        doc.insertPage();
        doc.setFillColor(173,216,230);
        doc.setDrawColor(0,0,0);
        doc.rect(10, 10, 30, 20, 'FD');

        doc.rect(40, 10, 80, 10, 'FD');
        doc.rect(40, 20, 27, 10, 'FD');
        doc.rect(67, 20, 27, 10, 'FD');
        doc.rect(94, 20, 26, 10, 'FD');

        doc.rect(120, 10, 80, 10, 'FD');
        doc.rect(120, 20, 20, 10, 'FD');
        doc.rect(140, 20, 20, 10, 'FD');
        doc.rect(160, 20, 20, 10, 'FD');
        doc.rect(180, 20, 20, 10, 'FD');
        doc.setFontSize(10);
        doc.setFontStyle("normal");
        doc.text(19, 20, "Fecha");

        doc.text(65, 15, "Horas Trabajadas");
        doc.text(47, 25, "Desde");
        doc.text(75, 25, "Hasta");
        doc.text(97, 25, "Descuento");

        doc.text(145, 15, "Clase de Trabajo");
        doc.text(123, 25, "Servicio \nen Sitio");
        doc.text(143, 25, "Entrena- \nmiento");
        doc.text(161, 25, "T. de Viaje");
        doc.text(183, 25, "T. de \nEspera");

        y=30;
      }
      console.log(y);
      doc.text(13, y+4, hojaDeTiempo[key]['fecha']);
      doc.rect(10, y, 30, 8);
      doc.text(43, y+4, hojaDeTiempo[key]['desde']);
      doc.rect(40, y, 27, 8);
      doc.text(70, y+4, hojaDeTiempo[key]['hasta']);
      doc.rect(67, y, 27, 8);
      doc.text(97, y+4, hojaDeTiempo[key]['descuento']);
      doc.rect(94, y, 26, 8);
      doc.text(123, y+4, hojaDeTiempo[key]['servicioSitio']);
      doc.rect(120, y, 20, 8);
      doc.text(143, y+4, hojaDeTiempo[key]['entrenamiento']);
      doc.rect(140, y, 20, 8);
      doc.text(163, y+4, hojaDeTiempo[key]['tiempoViaje']);
      doc.rect(160, y, 20, 8);
      doc.text(183, y+4, hojaDeTiempo[key]['tiempoEspera']);
      doc.rect(180, y, 20, 8);
      y=y+8;
    });    

    //FIRMAS
    doc.setFontSize(10);
    doc.setFontStyle("normal");
    doc.text(18, 246, "Emisor");
    doc.rect(5, 240, 40, 10);
    doc.rect(5, 250, 40, 25);
    doc.addImage(reporte['FirmaEmisor'], 5, 250, 40, 25);

    doc.text(50, 244, "Responsable \nde Obra");
    doc.rect(45, 240, 40, 10);
    doc.rect(45, 250, 40, 25);
    doc.addImage(reporte['FirmaResponsableO'], 45, 250, 40, 25);


    doc.text(90, 244, "Comerciante /\nFinanciero ");
    doc.rect(85, 240, 40, 10);
    doc.rect(85, 250, 40, 25);
    doc.addImage(reporte['FirmaComerciante'], 85, 250, 40, 25);


    doc.text(130, 244, "Responsable \ndel Proyecto");
    doc.rect(125, 240, 40, 10);
    doc.rect(125, 250, 40, 25);
    doc.addImage(reporte['FirmaResponsableP'], 125, 250, 40, 25);


    doc.text(170, 244, "Recibido por\nel Cliente");
    doc.rect(165, 240, 40, 10);
    doc.rect(165, 250, 40, 25);
    doc.addImage(reporte['FirmaCliente'], 165, 250, 40, 25);



    //CREAR EL PDF
    //doc.save(reporte['NombreColaborador']+'.pdf');
    //doc.output('dataurlnewwindow');
    window.open(doc.output('bloburl'), '_blank');
  }