import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl } from "@angular/forms";
import { ReportHttpProvider } from "../../providers/report-http/report-http";
import { FakeDataProvider } from "../../providers/fake-data/fake-data";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  fg: FormGroup;
  list: any[] = [];
  searchState = false;
  constructor(
    public navCtrl: NavController,
    private reportHttp: ReportHttpProvider,
    private fake: FakeDataProvider
  ) {
    this.fg = new FormGroup({
      dateFrom: new FormControl(null),
      dateTo: new FormControl(null)
    });
  }

  ionViewDidLoad() {}

  report(): void {
    this.searchState = true;
    this.list = [];
    // let data = this.fg.value;
    // this.reportHttp.getReport(data.dateFrom, data.dateTo)
    // .subscribe(res => {
    //   this.list = res;
    // })
    this.fake.getReports().then(d => {
      this.list = d.bill;
      this.list.forEach(p => {
        p.state = true;
      });
    });
  }

  /**
   * Metodo para realizar la busqueda del searchbar cada 3 letras
   * y si consigue realiza cambio de estados
   * @param key Recibe como parametro el texto
   */
  filterProducts(key: string) {
    if (key.split("").length === 3) {
      this.list.forEach(p => {
        if (
          p.bill_name_client.toLowerCase().includes(key.trim().toLowerCase()) ||
          p.bill_lastname_client
            .toLowerCase()
            .includes(key.trim().toLowerCase())
        ) {
          p.state = true;
        } else {
          console.log("The clients was not found :(");
          p.state = false;
        }
      });
    }
  }

  /**
   *  Metodo para cambiar de estado del evento
   * @param e Recibe como parametro el evento
   */
  onCancel(e) {
    if (e.target.value == "") {
      this.list.forEach(p => (p.state = true));
    }
  }
}
