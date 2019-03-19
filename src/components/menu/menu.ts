import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { HomePage } from './../../pages/home/home';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {


  constructor(public app: App, public menuCtrl: MenuController) {}

  logout(): void {
    this.menuCtrl.close();
    let nav = this.app.getRootNav();
    nav.setRoot(HomePage);
  }
}
