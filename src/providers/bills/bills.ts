import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionProvider } from "../session/session";
import { Observable } from "rxjs/Observable";
import { UrlProvider } from "../url/url";

@Injectable()
export class BillsProvider {
  /**
   * Objeto JSON que maneja las cabeceras
   */
  httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.session.user.token}`
    })
  };

  header = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(
    public http: HttpClient,
    private session: SessionProvider,
    public url: UrlProvider
  ) {}

  postBill(body): Observable<any> {
    const url = `${this.url.getUrl()}/bill`;
    return this.http.post(url, body, this.httpHeaders).pipe();
  }

  getBill(bill_id): Observable<any> {
    const id = parseInt(bill_id, 10);
    console.log(id);
    const url = `${this.url.getUrl()}/bill/${id}`;
    return this.http.get(url, this.header).pipe();
  }

  putBill(body): Observable<any> {
    const url = `${this.url.getUrl()}/bill`;
    return this.http.put(url, body, this.header).pipe();
  }
}
