import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";

@IonicPage()
@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
  testRadioOpen = false;
  testRadioResult: any;
  name: any;
  lastname: any;
  dish: any[] = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  dishes: any[] = [];
  cart: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpDish: DishHttpProvider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.name = this.navParams.get("name");
    this.lastname = this.navParams.get("lastname");
    this.getDish();
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
        value: data.recipe_title
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
        console.log(data);
      }
    });

    alert.present();
  }
}
