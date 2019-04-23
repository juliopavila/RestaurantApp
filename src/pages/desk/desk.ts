import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DeskStateProvider } from "../../providers/desk-state/desk-state";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";
import { DetailsPage } from "../details/details";

@IonicPage()
@Component({
  selector: "page-desk",
  templateUrl: "desk.html"
})
export class DeskPage {
  avaliable = true;
  tables_in_use: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public table: DeskStateProvider,
    public fake: FakeDataProvider
  ) {}

  ionViewDidLoad() {
    this.getTable();
  }

  newDeskAlert(): void {
    if (this.avaliable) {
      let alert = this.alertCtrl.create({
        title: "Nueva Mesa",
        inputs: [
          {
            name: "name",
            placeholder: "Nombre del cliente",
            value: ""
          },
          {
            name: "lastname",
            placeholder: "Apellido del cliente",
            value: ""
          }
        ],
        buttons: [
          {
            text: "CANCELAR",
            role: "Cancel",
            handler: () => {}
          },
          {
            text: "ACEPTAR",
            role: "Accept",
            handler: data => {
              //this.createTable(data);
              this.changeState();
            }
          }
        ]
      });
      alert.present();
    }
  }

  getTable() {
    this.fake.getTables().then(resp => {
      this.tables_in_use = resp.desk;
      console.log(this.tables_in_use);
    });
  }

  changeState() {
    this.table.table_id = this.table.table_id + 1;
    if (this.table.table_id === 6 || this.table.table_id < 0) {
      this.avaliable = false;
    }
  }

  move(name, lastname) {
    this.navCtrl.push(DetailsPage, { name: name, lastname: lastname });
  }

  test() {
    this.table.clearDesk();
  }
}
