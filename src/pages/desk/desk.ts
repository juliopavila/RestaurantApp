import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController
} from "ionic-angular";
import { DeskStateProvider } from "../../providers/desk-state/desk-state";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";
import { DetailsPage } from "../details/details";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";

@IonicPage()
@Component({
  selector: "page-desk",
  templateUrl: "desk.html"
})
export class DeskPage {
  avaliable = true;
  tables_in_use: any[] = [];
  tables = [];
  dish: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public table: DeskStateProvider,
    public actionSheetCtrl: ActionSheetController,
    public fake: FakeDataProvider,
    private httpDish: DishHttpProvider
  ) {}

  ionViewDidLoad() {
    this.getTables();
  }

  getTables() {
    this.tables_in_use = [];
    this.tables_in_use = this.table.getActiveDesk();
    this.changeState();
  }

  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Confirmacion",
      subTitle: "Se ha eliminado la mesa correctamente.",
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: () => {
            this.getTables();
          }
        }
      ]
    });
    alert.present();
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
              this.table.createDesk(data);
              this.getTables();
              this.changeState();
            }
          }
        ]
      });
      alert.present();
    }
  }

  changeState() {
    const quantity_tables = this.table.desk.length;
    if (quantity_tables === 6) {
      this.avaliable = false;
    } else {
      this.avaliable = true;
    }
  }

  move(name, lastname, id) {
    this.navCtrl.push(DetailsPage, { name: name, lastname: lastname, id });
  }

  presentActionSheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Acciones a realizar",
      buttons: [
        {
          text: "Eliminar",
          handler: () => {
            this.table.clearDesk(data);
            this.presentAlert();
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {}
        }
      ]
    });

    actionSheet.present();
  }

  getDish() {
    this.dish = [];
    this.httpDish.getDish().subscribe(res => {
      this.dish = res.general_category;
      console.log(this.dish);
    });
  }
}
