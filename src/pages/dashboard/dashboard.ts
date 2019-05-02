import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { SessionProvider } from "../../providers/session/session";
import { DishPage } from "../dish/dish";
import { IngredientsPage } from "../ingredients/ingredients";
import { ReportPage } from "../report/report";
import { DeskPage } from "../desk/desk";
import { BillPage } from "../bill/bill";

@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  type_user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private session: SessionProvider
  ) {}

  ionViewDidLoad(): void {
    let user = this.session.user;
    this.type_user = user.type;
    this.menuCtrl.enable(true);
    // this.type_user = this.navParams.get("type");
  }

  move(op): void {
    switch (op) {
      case 1:
        this.navCtrl.push(DishPage);
        break;

      case 2:
        this.navCtrl.push(IngredientsPage);
        break;

      case 3:
        this.navCtrl.push(ReportPage);
        break;

      case 4:
        this.navCtrl.push(DeskPage);
        break;

      case 5:
        this.navCtrl.push(BillPage);
        break;
    }
  }
}
