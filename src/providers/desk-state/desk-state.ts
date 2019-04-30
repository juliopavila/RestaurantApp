import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DeskStateProvider {
  table_id = 0;
  finish = false;
  second = false;
  desk: any[] = [];
  remove: any[] = [];

  constructor(public http: HttpClient) {}

  clearDesk(data) {
    this.remove = [];
    this.finish = false;
    this.desk.forEach(element => {
      if (element.id != data) {
        this.remove.push(element);
      } else {
        this.desk = [];
      }
    });
    if (this.remove.length > 0) {
      this.finish = true;
    }
    if (this.finish === true) {
      this.desk = [];
      this.remove.map(r => {
        this.desk.push(r);
      });
    }
  }

  createDesk(details) {
    let deskInfo = {
      name: details.name,
      lastname: details.lastname,
      id: this.table_id
    };
    this.table_id = this.table_id + 1;
    console.log(deskInfo);
    return this.table_id && this.desk.push(deskInfo);
  }

  getActiveDesk() {
    let busy_desk = [];
    this.desk.map(e => {
      busy_desk.push(e);
    });
    return busy_desk;
  }
}
