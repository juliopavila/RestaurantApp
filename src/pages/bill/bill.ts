import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { BillsProvider } from "../../providers/bills/bills";

@IonicPage()
@Component({
  selector: "page-bill",
  templateUrl: "bill.html"
})
export class BillPage {
  bills: any[] = [];
  list_plates: any[] = [];
  list: any[] = [];
  bill_id;
  name_client;
  lastname_client;
  facture_number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private billHttp: BillsProvider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.presentAlert();
  }

  getBills(id) {
    this.bills = [];
    this.list_plates = [];
    this.billHttp.getBill(id).subscribe(resp => {
      console.log(resp);
      this.bills.push(resp.data.bill);
      this.list_plates = resp.data.list_plate;
    });
    console.log(this.list_plates);
  }

  /**
   * Metodo para mostrar alerta de confirmacion
   * @returns void
   */
  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Busqueda De Factura",
      inputs: [
        {
          name: "id",
          placeholder: "Ingrese numero de transaccion",
          value: "",
          type: "number"
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
            this.getBills(data.id);
          }
        }
      ]
    });
    alert.present();
  }

  deleteDish(id) {
    let aux = [];
    this.list_plates.map(l => {
      if (l.recipe_id != id) {
        aux.push(l);
      } else {
        this.list_plates = [];
      }
    });
    aux.map(a => {
      this.list_plates.push(a);
    });
  }

  updateBill() {
    this.list = [];
    this.list_plates.map(c => {
      this.list.push({ recipe_id: c.recipe_id });
    });

    let body = {
      bill_id: this.bill_id,
      name_client: this.name_client,
      lastname_client: this.lastname_client,
      facture_number: this.facture_number,
      list_plate: this.list
    };

    this.billHttp.putBill(body).subscribe(res => {
      console.log(res);
    });
  }

  bill(data) {
    (this.bill_id = data.bill_id),
      (this.name_client = data.name_client),
      (this.lastname_client = data.lastname_client),
      (this.facture_number = data.facture_number);
  }
}
