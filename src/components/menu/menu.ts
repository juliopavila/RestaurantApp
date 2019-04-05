import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { HomePage } from './../../pages/home/home';
import { UserProvider } from '../../providers/user/user';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  activeMenu: String;

  constructor(public app: App, public menuCtrl: MenuController, private userHttp: UserProvider, private session: SessionProvider) {}

  menuActive(): void {
    this.activeMenu = 'menu1';
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'HomePage');
  }

  logout(): void {
    this.menuCtrl.close();
    this.userHttp.logout();
    this.session.sessionDestroy();
    let nav = this.app.getRootNav();
    nav.setRoot(HomePage);
  }
}
