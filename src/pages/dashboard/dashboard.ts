import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  type_user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.type_user = this.navParams.get('type_user');
  }

}
