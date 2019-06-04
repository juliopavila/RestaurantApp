import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SessionProvider {
  user: any;

  constructor(public http: HttpClient) {}

  dataSession(info): void {
    this.user = {
      token: info.token,
      type: info.data.type,
      name: info.data.name
    };
    console.log(this.user);
  }

  sessionDestroy(): void {
    this.user = {};
  }
}
