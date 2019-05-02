import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DeskDetailsProvider {
  desk_details: any[] = [];
  deskOfId: any[] = [];
  aux: any[] = [];
  aux2: any[] = [];
  aux3: any[] = [];
  constructor(public http: HttpClient) {}

  addDishToTable(data) {
    this.desk_details.push(data);
  }

  getDetailsOfTable(desk_id): any {
    this.deskOfId = [];
    this.desk_details.map(resp => {
      if (resp.table_id === desk_id) {
        this.deskOfId.push(resp);
      }
    });
  }

  removeDish(id) {
    this.aux = [];
    this.aux2 = [];
    this.desk_details.map(desk => {
      if (desk.recipe_id != id) {
        this.aux2.push(desk);
      } else {
        this.desk_details = [];
      }
    });
    this.deskOfId.map(d => {
      if (d.recipe_id != id) {
        this.aux.push(d);
      } else {
        this.deskOfId = [];
      }
      this.deskOfId = [];
    });
    this.aux.map(a => {
      this.deskOfId.push(a);
    });
    this.aux2.map(au => {
      this.desk_details.push(au);
    });
  }

  removeItems(id) {
    this.aux3 = [];
    this.desk_details.map(res => {
      if (res.table_id != id) {
        this.aux3.push(res);
      } else {
        this.desk_details = [];
      }
    });
    this.aux3.map(a => {
      this.desk_details.push(a);
    });
  }
}
