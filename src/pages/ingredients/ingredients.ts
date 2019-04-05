import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DishHttpProvider } from '../../providers/dish-http/dish-http';


@IonicPage()
@Component({
  selector: 'page-ingredients',
  templateUrl: 'ingredients.html',
})
export class IngredientsPage {

  list: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dishHttp: DishHttpProvider) {
  }

  ionViewDidLoad(): void {
    this.ingredients();
  }

  ingredients(): void{
    this.dishHttp.getIngredients()
    .subscribe(res => {
      this.list = res;
    })
  }
}
