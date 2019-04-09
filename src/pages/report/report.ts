import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportHttpProvider } from '../../providers/report-http/report-http';


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  fg: FormGroup;
  list: any[] = [];
  constructor(
    public navCtrl: NavController,
    private reportHttp: ReportHttpProvider
  ) {
    this.fg = new FormGroup({
      dateFrom: new FormControl(null),
      dateTo: new FormControl(null)
    })
  }

  ionViewDidLoad() {
  }

  report():void {
    this.list = [];
    let data = this.fg.value;
    this.reportHttp.getReport(data.dateFrom, data.dateTo)
    .subscribe(res => {
      this.list = res;
    })
  }
}
