import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";
import { DeskDetailsProvider } from "../../providers/desk-details/desk-details";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BillsProvider } from "../../providers/bills/bills";

@IonicPage()
@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
  fg: FormGroup;
  testRadioOpen = false;
  testRadioResult: any;
  name: any;
  lastname: any;
  dish: any[] = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  dishes: any[] = [];
  cart: any[] = [];
  table_id: any;
  command: any[] = [];
  aux: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpDish: DishHttpProvider,
    public alertCtrl: AlertController,
    public deskDetails: DeskDetailsProvider,
    public fake: FakeDataProvider,
    public billHttp: BillsProvider
  ) {
    this.fg = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  ionViewDidLoad() {
    this.name = this.navParams.get("name");
    this.lastname = this.navParams.get("lastname");
    this.table_id = this.navParams.get("id");
    this.getDish();
    this.getTableDetails();
  }

  getDish() {
    this.dish = [];
    // this.httpDish.getDish().subscribe(res => {
    //   this.dish = res.general_category;
    //   console.log(this.dish);
    // });
    this.fake.getPlates().then(res => {
      this.dish = res.general_category;
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
        data.map(e => {
          this.dishes.map(dish => {
            if (e === dish.recipe_id) {
              let info = {
                table_id: this.table_id,
                recipe_title: dish.recipe_title,
                recipe_id: dish.recipe_id
              };
              this.deskDetails.addDishToTable(info);
              this.getTableDetails();
            }
          });
        });
      }
    });

    alert.present();
  }

  getTableDetails() {
    this.command = [];
    this.deskDetails.getDetailsOfTable(this.table_id);
    this.command = this.deskDetails.deskOfId;
  }

  bill() {
    let list_plate_data = [];
    let body = {
      name_client: this.name,
      lastname_client: this.lastname,
      facture_number: this.random(),
      list_plate: list_plate_data
    };
    this.command.map(c => {
      list_plate_data.push({
        recipe_id: c.recipe_id
      });
    });
    //Enviamos la peticion
    this.billHttp.postBill(body).subscribe(res => {
      console.log(res);
      if (res.status === 201) {
        this.presentAlert(
          "Confirmacion",
          "Se ha realizado el pago correctamente"
        );
      }
    });
    console.log(body);
  }

  random(): number {
    let rand = Math.floor(Math.random() * 20) + 1;
    return rand;
  }

  deleteDish(id) {
    this.command = [];
    this.deskDetails.removeDish(id);
    this.command = this.deskDetails.deskOfId;
    console.log(this.command);
  }

  /**
   * Metodo para mostrar alerta de confirmacion
   * @returns void
   */
  presentAlert(label, msg): void {
    let alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: () => {
            this.command = [];
            this.deskDetails.removeItems(this.table_id);
            this.command = this.deskDetails.deskOfId;
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
