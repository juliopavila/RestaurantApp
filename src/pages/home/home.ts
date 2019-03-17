import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fg : FormGroup;

  constructor(public navCtrl: NavController) {
    this.fg = new FormGroup({
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
    })
  }

  login() : void {
    console.log(this.fg.value);
  }

  register() : void {
    this.navCtrl.setRoot(SignupPage);
  }
}
