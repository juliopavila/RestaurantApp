import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class SessionProvider {

  user: any;

  constructor(public http: HttpClient) {
    console.log('Hello SessionProvider Provider');
  }

  dataSession(info): void {
    this.user = {
      "token": info.token,
      "type": info.data.type,
      "name": info.data.name
    };
    console.log(this.user);
  }

  sessionDestroy(): void {
    this.user = {};
  }

}
