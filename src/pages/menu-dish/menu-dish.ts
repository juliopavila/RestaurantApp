import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';


@IonicPage()
@Component({
  selector: 'page-menu-dish',
  templateUrl: 'menu-dish.html',
})
export class MenuDishPage {

  dish: any [] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.dish = [];
    this.dish = this.navParams.get('list');
    this.dish.map(t => {
      console.log(t);
    })
  }

  recipe(id): void{
    this.navCtrl.push(RecipePage,{'id':id});
  }

}
