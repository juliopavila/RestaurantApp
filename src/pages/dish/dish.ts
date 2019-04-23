import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DishHttpProvider } from "../../providers/dish-http/dish-http";
import { MenuDishPage } from "../menu-dish/menu-dish";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";

@IonicPage()
@Component({
  selector: "page-dish",
  templateUrl: "dish.html"
})
export class DishPage {
  type_menu: any[] = [];
  menuDish: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dishHttp: DishHttpProvider,
    private fake: FakeDataProvider,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad(): void {
    this.getAllDish();
  }

  getAllDish(): void {
    this.type_menu = [];
    this.dishHttp.getDish().subscribe(res => {
      this.type_menu = res.general_category;
      this.type_menu.map(t => {
        if (t.general_name === "Almuerzos") {
          t.type = 1;
        } else {
          t.type = 3;
        }
        console.log(t.general_name);
      });
      console.log(this.type_menu);
    });
    // this.fake.getPlates().then(res => {
    //   this.type_menu = res.general_category;
    //   this.type_menu.map(t => {
    //     console.log(t.general_name);
    //   });
    //   console.log(this.type_menu);
    // });
  }

  selectMenu(list, type): void {
    this.navCtrl.push(MenuDishPage, { list: list, type: type });
  }
}
