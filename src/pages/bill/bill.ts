import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { BillsProvider } from "../../providers/bills/bills";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

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
  dish: any[];
  dishes: any[];
  command: any[];

  testRadioOpen = false;
  testRadioResult: any;
  testCheckboxOpen = false;
  testCheckboxResult: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private billHttp: BillsProvider,
    public alertCtrl: AlertController,
    public httpDish: DishHttpProvider
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
      this.bill(resp.data.bill);
    });
    console.log(this.list_plates);
  }

  /**
   * Metodo para mostrar alerta de confirmacion
   * @returns void
   */
  presentAlert(): void {
    this.getDish();
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

    console.log(body);
    this.billHttp.putBill(body).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        this.confAlert();
      }
    });
  }

  bill(data) {
    this.bill_id = data.bill_id;
    this.name_client = data.bill_name_client;
    this.lastname_client = data.bill_lastname_client;
    this.facture_number = data.bill_facture_number;
  }

  /**
   * Metodo para mostrar alerta de confirmacion
   * @returns void
   */
  confAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Confirmacion",
      subTitle: "Se ha modificado correctamente la factura",
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  getDish() {
    this.dish = [];
    this.httpDish.getDish().subscribe(res => {
      this.dish = res.general_category;
      console.log(this.dish);
    });
  }

  doRadio() {
    this.dishes = [];
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Categoria");

    this.dish.map(d => {
      alert.addInput({
        type: "radio",
        label: d.general_name,
        value: d.list_recipe
      });
    });

    alert.addButton("CANCELAR");
    alert.addButton({
      text: "SIGUIENTE",
      handler: (data: any) => {
        this.dishes = data;
        this.doCheckbox();
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present();
  }

  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Plato");

    this.dishes.map(data => {
      alert.addInput({
        name: "dish",
        type: "checkbox",
        label: data.recipe_title,
        value: data.recipe_id,
        id: data.recipe_id
      });
    });

    alert.addButton({
      text: "ATRAS",
      handler: () => {
        this.doRadio();
      }
    });
    alert.addButton({
      text: "ACEPTAR",
      handler: (data: any) => {
        this.command = [];
        let prov = [];
        this.list_plates.map(lp => {
          prov.push(lp);
        });
        for (let i = 0; i < data.length; i++) {
          this.dishes.map(e => {
            if (e.recipe_id === data[i]) {
              console.log("te encontre");
              this.command.push(e);
            }
          });
        }
        this.list_plates = [];
        this.command.map(c => {
          prov.push(c);
        });
        prov.map(p => {
          this.list_plates.push(p);
        });
      }
    });

    alert.present();
  }
}
