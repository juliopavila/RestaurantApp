import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    private userHttp: UserProvider, 
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) {
    this.fg = new FormGroup({
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
    })
  }

  ionViewDidLoad(): void{
    this.menuCtrl.enable(false);
  }

  login() : void {
    this.navCtrl.setRoot(DashboardPage);
    // if (this.fg.valid) {
    //   this.userHttp.signup(this.fg.value).subscribe(
    //     res => {
    //       console.log(res.status);
    //       if (res.status == 200) {
    //         this.navCtrl.setRoot(DashboardPage);
    //       } else {
    //         alert("Error");
    //         this.presentAlert("Error", "Usuario o contraseña incorrecto.");
    //       }
    //     },
    //   );
    // } else {
    //   this.presentAlert("Error", "Ha ocurrido un error de conexion, intente mas tarde.");
    // }
  }

  register() : void {
    this.navCtrl.setRoot(SignupPage);
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert(label,msg): void {
    let alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  
}
