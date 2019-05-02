import { Component, Testability } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";

@IonicPage()
@Component({
  selector: "page-ingredients",
  templateUrl: "ingredients.html"
})
export class IngredientsPage {
  list: any[] = [];
  id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dishHttp: DishHttpProvider,
    private alertCtrl: AlertController,
    private fake: FakeDataProvider
  ) {}

  ionViewDidLoad(): void {
    this.ingredients();
  }

  ingredients(): void {
    this.list = [];
    this.dishHttp.getIngredients().subscribe(res => {
      this.list = res.ingredients;
      console.log(this.list);
    });
    // this.fake.getIngridents().then(res => {
    //   this.list = res.ingredients;
    // });
  }

  takeId(info) {
    this.id = info;
  }

  newIngredentAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Nuevo Ingrediente",
      inputs: [
        {
          name: "name",
          placeholder: "Nombre del ingrediente",
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
            this.newIngredients(data);
          }
        }
      ]
    });
    alert.present();
  }

  updateIngredentAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Actualizar Ingrediente",
      inputs: [
        {
          name: "name",
          placeholder: "Nuevo nombre del ingrediente",
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
            let body = {
              name: data.name,
              id: this.id
            };
            this.updateIngredients(body);
          }
        }
      ]
    });
    alert.present();
  }

  newIngredients(name): void {
    this.dishHttp.postIngredients(name).subscribe(res => {
      this.ingredients();
    });
  }
  updateIngredients(body): void {
    this.dishHttp.putIngredients(body).subscribe(res => {
      this.ingredients();
    });
  }
}
