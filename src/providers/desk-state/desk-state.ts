import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DeskStateProvider {
  table_id = 0;

  desk: any[] = [];
  constructor(public http: HttpClient) {}

  clearDesk() {
    this.table_id = this.table_id - 1;
    return this.table_id;
  }
}
