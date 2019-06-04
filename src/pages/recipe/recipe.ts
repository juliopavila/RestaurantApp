import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DishHttpProvider } from '../../providers/dish-http/dish-http';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  details: any[] = [];
  ingredients: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dishHttp: DishHttpProvider) {
  }

  ionViewDidLoad():void {
    this.recipe(this.navParams.get('id'));
  }

  recipe(id): void{
    this.details = [];
    this.ingredients = [];
    this.dishHttp.getRecipe(id)
    .subscribe(res => {
      this.details = res.recipe_ingredent;
      console.log(this.details);
    })
  }
}
