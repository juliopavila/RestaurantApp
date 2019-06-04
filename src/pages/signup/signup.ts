import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, MenuController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HomePage } from "./../home/home";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  values = [{ value: 0, label: "Cocina" }, { value: 1, label: "Caja" }, { value: 2, label: "Contabilidad"}];

  fg: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userHttp: UserProvider,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) {
    this.fg = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/)
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/)
        ]),
        username: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/)
        ]),
        type: new FormControl(null),
        password: new FormControl(null, [Validators.required]),
        confPass: new FormControl(null, [Validators.required])
      },
      this.passwordMatchValidator
    );
  }

  ionViewDidLoad(): void{
    this.menuCtrl.enable(false);
  }

  passwordMatchValidator = (fg: FormGroup) => {
    return fg.get("password").value === fg.get("confPass").value ? null : { mismatch: true };
  };

  register() {
    if (this.fg.valid) {
      this.userHttp.signup(this.fg.value).subscribe(res => {
        console.log(res.status);
        if (res.status == 200) {
          this.presentAlert("Confirmacion", "Se ha creado la cuenta satisfactoriamente.", 200);
        } else {
          this.presentAlert("Error", "Ha ocurrido un  , intente mas tarde.",401);
        }
      });
    } else {
      this.presentAlert("Error", "Ha ocurrido un error de conexion, intente mas tarde.",500);
    }
  }

  login(): void {
    this.navCtrl.setRoot(HomePage);
  }

  /**
   * Metodo para mostrar alerta de confirmacion
   * @returns void
   */
  presentAlert(label,msg, status): void {
    let alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: [
        {
          text: "ACEPTAR",
          role: "Accept",
          handler: () => {
            if(status == 200){
              this.navCtrl.setRoot(HomePage);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
