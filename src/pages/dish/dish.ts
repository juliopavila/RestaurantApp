import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DishHttpProvider } from '../../providers/dish-http/dish-http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MenuDishPage } from '../menu-dish/menu-dish';

/**
 * Generated class for the DishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {

  type_menu: any[] = [];
  menuDish: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dishHttp: DishHttpProvider) {
  }

  ionViewDidLoad(): void {
    this.getAllDish();
  }

  getAllDish(): void{
    this.type_menu = [];
    this.dishHttp.getDish()
    .subscribe(
      res => {
        this.type_menu = res.general_category;
        this.type_menu.map(t => {
          console.log(t.general_name);
        })
        console.log(this.type_menu);
      }
    )
  }

  selectMenu(list): void{
    this.navCtrl.push(MenuDishPage, {'list':list});
  }
  
}
