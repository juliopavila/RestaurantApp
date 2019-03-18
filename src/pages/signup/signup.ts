import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from './../home/home';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  values = [{value:0, label:'Cocina'},{value:1, label: 'Caja'}];

  fg : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userHttp: UserProvider) {
    this.fg = new FormGroup({
      name: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      lastname: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      type: new FormControl(null),
      password: new FormControl (null, [Validators.required]),
      confPass: new FormControl (null, [Validators.required]),
    }, this.passwordMatchValidator)
  }

  ionViewDidLoad() {
  }

  passwordMatchValidator = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('confPass').value ? null : { 'mismatch': true };
  }

  register() {
    this.userHttp.signup(this.fg.value);
  }

  login(): void {
    this.navCtrl.setRoot(HomePage);
  }
}

