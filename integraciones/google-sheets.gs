/**
 * Respuestas del quiz y de la calculadora → Google Sheets
 *
 * Cómo instalarlo (una sola vez):
 *   1. Crear una planilla nueva en Google Drive (por ejemplo "Respuestas emiliacaro.com").
 *   2. Extensiones → Apps Script. Borrar lo que haya y pegar este archivo completo. Guardar.
 *   3. Implementar → Nueva implementación → tipo "Aplicación web".
 *        Ejecutar como: Yo
 *        Quién tiene acceso: Cualquier persona
 *      Autorizar los permisos que pide Google.
 *   4. Copiar la "URL de la aplicación web" (termina en /exec) y pegarla en
 *      SHEETS_URL, al principio de script.js.
 *
 * Las pestañas "Quiz" y "Calculadora" se crean solas con la primera respuesta.
 * No se guarda ningún dato personal: ni nombre, ni mail, ni IP.
 */

var ENCABEZADOS = {
  Quiz: ['Fecha', 'Idioma', 'Puntaje (de 9)',
         'P1 Causa de muerte', 'P2 % fuerza laboral', 'P3 % conducción',
         'P4 Endometriosis', 'P5 Años enfermas', 'P6 Lugar de la salud',
         'P7 Retorno prevención', 'P8 Barreras de acceso', 'P9 % del PBI'],
  Calculadora: ['Fecha', 'Idioma', 'Personal total', '% mujeres en la plantilla',
                'Cargos de conducción', 'Ocupados por mujeres',
                '% mujeres en conducción', 'Brecha (puntos)', 'Mujeres que faltan en conducción']
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var datos = JSON.parse(e.postData.contents);
    var fila = validar(datos);
    if (!fila) return respuesta('rechazado');

    var nombre = datos.tipo === 'quiz' ? 'Quiz' : 'Calculadora';
    var libro = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = libro.getSheetByName(nombre) || libro.insertSheet(nombre);
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(ENCABEZADOS[nombre]);
      hoja.setFrozenRows(1);
      hoja.getRange(1, 1, 1, ENCABEZADOS[nombre].length).setFontWeight('bold');
    }
    hoja.appendRow([new Date(), datos.idioma === 'en' ? 'EN' : 'ES'].concat(fila));
    return respuesta('ok');
  } catch (err) {
    return respuesta('error');
  } finally {
    lock.releaseLock();
  }
}

// Sólo acepta los valores que pueden salir de la página: cualquier otra cosa se descarta.
function validar(d) {
  if (!d || typeof d !== 'object') return null;

  if (d.tipo === 'quiz') {
    var r = d.respuestas;
    if (!Array.isArray(r) || r.length !== 9) return null;
    var celdas = [];
    for (var i = 0; i < 9; i++) {
      var x = r[i];
      if (!x || ['A', 'B', 'C'].indexOf(x.opcion) === -1 || typeof x.ok !== 'boolean') return null;
      celdas.push(x.opcion + (x.ok ? ' ✓' : ' ✗'));
    }
    var puntaje = r.filter(function (x) { return x.ok; }).length;
    return [puntaje].concat(celdas);
  }

  if (d.tipo === 'calculadora') {
    var n = [d.total, d.pctMujeres, d.cargos, d.cargosMujeres];
    if (!n.every(function (v) { return typeof v === 'number' && isFinite(v) && v >= 0 && v < 10000000; })) return null;
    if (d.pctMujeres > 100 || d.cargos <= 0 || d.cargosMujeres > d.cargos || d.total <= 0) return null;
    var pctConduccion = Math.round(d.cargosMujeres / d.cargos * 1000) / 10;
    var brecha = Math.round((d.pctMujeres - pctConduccion) * 10) / 10;
    var faltan = Math.max(0, Math.round(d.cargos * d.pctMujeres / 100) - d.cargosMujeres);
    return [d.total, d.pctMujeres, d.cargos, d.cargosMujeres, pctConduccion, brecha, faltan];
  }

  return null;
}

function respuesta(texto) {
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.TEXT);
}
