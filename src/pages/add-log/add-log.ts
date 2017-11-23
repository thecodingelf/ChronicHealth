import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LogProvider } from './../../providers/log/log';

@IonicPage()
@Component({
  selector: 'page-add-log',
  templateUrl: 'add-log.html',
})
export class AddLogPage {

  constructor(public navCtrl: NavController, public logProvider: LogProvider, public translateService: TranslateService) { }

  createLog(logActivity: string, logPainLevel: number, logTime: string): void {
    this.logProvider
      .createLog(logActivity, logPainLevel, logTime)
      .then(newLog => {
        this.navCtrl.pop();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLogPage');
  }

} 
