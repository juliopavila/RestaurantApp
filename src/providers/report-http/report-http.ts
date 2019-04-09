import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class ReportHttpProvider {

  constructor(public http: HttpClient, private url: UrlProvider) {
  }

  /**
* Metodo de enviar la peticion obtener el reporte
* @returns Observable con la respuesta del servidor
*/
  getReport(dfrom,dto): Observable<any> {
    const url = `${this.url.getUrl()}/reports?dateFrom=${dfrom}&dateTo=${dto}`;
    return this.http
      .get(url, httpHeaders)
      .pipe();
  }
}
