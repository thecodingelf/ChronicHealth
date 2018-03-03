import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// Translation service.
import { TranslateService } from '@ngx-translate/core';
// Providers.
import { LogProvider } from './../../providers/log/log';

@IonicPage()
@Component({
  selector: 'page-add-log',
  templateUrl: 'add-log.html',
})
export class AddLogPage {

  constructor(public navCtrl: NavController, public logProvider: LogProvider, public translateService: TranslateService) { }

  // Creates the log entry to the database and directs user back to main screen.
  //logCategory: string, logCategory,
<<<<<<< HEAD
  createLog(logCategory: string, logActivity: string, logPainLevelBefore: number, logPainLevelAfter: number,  logTime: string, logDate: string ): void {
    this.logProvider
      .createLog(logCategory, logActivity, logPainLevelBefore, logPainLevelAfter, logTime, logDate )
=======
  createLog(logCategory: string, logActivity: string, logPainLevelBefore: number, logPainLevelAfter: number,  logTime: string, logDate: string): void {
    this.logProvider
      .createLog(logCategory, logActivity, logPainLevelBefore, logPainLevelAfter, logTime, logDate)
>>>>>>> 5b35ae09ec81b06474bf022c51a4d2ea9fc5d1dd
      .then(newLog => {
        this.navCtrl.pop();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLogPage');
  }

}
