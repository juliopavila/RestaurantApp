import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DishHttpProvider } from '../../providers/dish-http/dish-http';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';


@IonicPage()
@Component({
  selector: 'page-ingredients',
  templateUrl: 'ingredients.html',
})
export class IngredientsPage {

  list: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dishHttp: DishHttpProvider,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad(): void {
    this.ingredients();
  }

  ingredients(): void {
    this.list = [];
    this.dishHttp.getIngredients()
      .subscribe(res => {
        this.list = res.ingredients;
        console.log(this.list);
      })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  newIngredentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Nuevo Ingrediente',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre del ingrediente',
          value: ''
        }
      ],
      buttons: [
        {
          text: "CANCELAR",
          role: "Cancel",
          handler: () => {
          }
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
      title: 'Actualizar Ingrediente',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nuevo nombre del ingrediente',
          value: ''
        }
      ],
      buttons: [
        {
          text: "CANCELAR",
          role: "Cancel",
          handler: () => {
          }
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
  newIngredients(name): void {
    this.dishHttp.postIngredients(name)
      .subscribe(res => {
        this.ingredients();
      })
  }
}
