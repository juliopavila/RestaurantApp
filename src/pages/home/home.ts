import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupPage } from './../signup/signup';
import { DashboardPage } from './../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fg : FormGroup;

  constructor(public navCtrl: NavController, private userHttp: UserProvider) {
    this.fg = new FormGroup({
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
    })
  }

  login() : void {
    this.userHttp.login(this.fg.value);
    this.navCtrl.setRoot(DashboardPage);
  }

  register() : void {
    this.navCtrl.setRoot(SignupPage);
  }
}
