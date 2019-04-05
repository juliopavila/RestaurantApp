import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UrlProvider {
  constructor(public http: HttpClient) {
  }

  /**
   * Metodo en el provider para generalizar la ip
   * @returns Retorna la ip del servidor
   */
  getUrl(): string {
    let url = "http://restaurant.ddns.net:3001";
    return url;
  }
}
