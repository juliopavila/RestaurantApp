import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { HomePage } from './../../pages/home/home';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  activeMenu: String;

  constructor(public app: App, public menuCtrl: MenuController) {}

  menuActive(): void {
    this.activeMenu = 'menu1';
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'HomePage');
  }

  logout(): void {
    this.menuCtrl.close();
    let nav = this.app.getRootNav();
    nav.setRoot(HomePage);
  }
}
