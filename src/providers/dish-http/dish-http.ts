import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UrlProvider } from "../url/url";

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class DishHttpProvider {
  constructor(public http: HttpClient, private url: UrlProvider) {}

  /**
   * Metodo de enviar la peticion obtener los platillos
   * @returns Observable con la respuesta del servidor
   */
  getDish(): Observable<any> {
    const url = `${this.url.getUrl()}/menu`;
    return this.http.get(url, httpHeaders).pipe();
  }

  /**
   * Metodo de enviar la peticion obtener los platillos
   * @returns Observable con la respuesta del servidor
   */
  getIngredients(): Observable<any> {
    const url = `${this.url.getUrl()}/ingredients`;
    return this.http.get(url, httpHeaders).pipe();
  }
  /**
   * Metodo de enviar la peticion obtener los platillos
   * @returns Observable con la respuesta del servidor
   */
  getRecipe(id): Observable<any> {
    const url = `${this.url.getUrl()}/recipe/${id}`;
    return this.http.get(url, httpHeaders).pipe();
  }

  postIngredients(body): Observable<any> {
    const url = `${this.url.getUrl()}/ingredients`;
    return this.http.post(url, body, httpHeaders).pipe();
  }

  putIngredients(body): Observable<any> {
    const url = `${this.url.getUrl()}/ingredients`;
    return this.http.put(url, body, httpHeaders).pipe();
  }

  postPlate(body): Observable<any> {
    const url = `${this.url.getUrl()}/recipe`;
    return this.http.post(url, body, httpHeaders).pipe();
  }

  deletePlate(id): Observable<any> {
    const url = `${this.url.getUrl()}/recipe/${id}`;
    return this.http.delete(url, httpHeaders).pipe();
  }

  updatePlate(body): Observable<any> {
    const url = `${this.url.getUrl()}/recipe`;
    return this.http.put(url, body, httpHeaders).pipe();
  }
}
