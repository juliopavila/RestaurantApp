import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { RecipePage } from "../recipe/recipe";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";
import { DishPage } from "../dish/dish";
import { ActionSheetController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-menu-dish",
  templateUrl: "menu-dish.html"
})
export class MenuDishPage {
  type = undefined;
  dish: any[] = [];
  ingridients: any[] = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private ihttp: DishHttpProvider,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.dish = [];
    this.ingridients = [];
    this.getIngridients();
    this.dish = this.navParams.get("list");
    this.type = this.navParams.get("type");
  }

  getIngridients() {
    this.ihttp.getIngredients().subscribe(res => {
      this.ingridients = res.ingredients;
    });
  }
  recipe(id): void {
    this.navCtrl.push(RecipePage, { id: id });
  }

  newIngredentAlert(): void {
    let alert = this.alertCtrl.create({
      title: "Nuevo Platillo",
      inputs: [
        {
          name: "title",
          placeholder: "Nombre del plato",
          value: ""
        },
        {
          name: "text",
          placeholder: "Descripcion del plato",
          value: ""
        },
        {
          name: "time",
          placeholder: "Tiempo de preparacion",
          value: ""
        },
        {
          name: "price",
          placeholder: "Precio",
          type: "number",
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
          text: "SIGUIENTE",
          role: "Accept",
          handler: data => {
            this.doCheckbox(data);
          }
        }
      ]
    });
    alert.present();
  }

  updateAlert(data): void {
    let alert = this.alertCtrl.create({
      title: "Actualizar Platillo",
      inputs: [
        {
          name: "title",
          placeholder: "Nombre del plato",
          value: ""
        },
        {
          name: "text",
          placeholder: "Descripcion del plato",
          value: ""
        },
        {
          name: "time",
          placeholder: "Tiempo de preparacion",
          value: ""
        },
        {
          name: "price",
          placeholder: "Precio",
          type: "number",
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
          handler: body => {
            let info = {
              text: body.text,
              title: body.title,
              time: body.time,
              price: body.price,
              type: this.type,
              id: data
            };
            this.ihttp.updatePlate(info).subscribe(res => {
              if (res.status == 200) {
                this.presentAlert("Confirmacion", "Se ha actualizado el plato");
                this.navCtrl.push(DishPage);
              } else {
                this.presentAlert("Error", "Ocurrio un problema");
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  doCheckbox(prevData) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar ingredientes");

    this.ingridients.map(data => {
      alert.addInput({
        name: "id",
        type: "checkbox",
        label: data.ingredent_name,
        value: data.ingredent_id
      });
    });

    alert.addButton({
      text: "ATRAS",
      handler: () => {
        this.newIngredentAlert();
      }
    });
    alert.addButton({
      text: "ACEPTAR",
      handler: (data: any) => {
        let ingridients_data = [];
        let info = {
          text: prevData.text,
          title: prevData.title,
          time: prevData.time,
          price: prevData.price,
          type: this.type,
          ingredents: ingridients_data
        };
        data.forEach(element => {
          ingridients_data.push({
            id: element,
            measure: "50g"
          });
        });
        this.createPlate(info);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });

    alert.present();
  }

  createPlate(info) {
    this.ihttp.postPlate(info).subscribe(res => {
      console.log(res);
      if (res.status == 201) {
        this.presentAlert("Confirmacion", "Se ha creado el plato");
        this.navCtrl.push(DishPage);
      } else {
        this.presentAlert("Error", "Ocurrio un problema");
      }
    });
  }

  presentAlert(label, msg): void {
    let alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  presentActionSheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Acciones a realizar",
      buttons: [
        {
          text: "Editar",
          handler: () => {
            this.updateAlert(data);
          }
        },
        {
          text: "Eliminar",
          handler: () => {
            this.ihttp.deletePlate(data).subscribe(res => {
              console.log(res);
            });
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }
}
