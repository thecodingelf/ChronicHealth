import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';
import { DiaryProvider } from '../../providers/diary/diary';
// Service.
import { ToastService } from "../../services/toast/toast.service";
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-rate-my-pain',
  templateUrl: 'rate-my-pain.html',
})
export class RateMyPainPage {

  logs: string = "logyourpain";

  date: any = new Date();

  public diaryLog: Array<any>;

  public logList: Array<any>;

  constructor(private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public diaryProvider: DiaryProvider, public translateService: TranslateService, public alertCtrl: AlertController) {
  }

  createDiary(diaryEntry: string = '', dateEntry: any = this.date): void {
    this.diaryProvider
      .createDiary(diaryEntry, dateEntry)
      .then(newDiary => {});
  }

  goToAddLog(): void {
    this.navCtrl.push('AddLogPage');
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  ionViewDidLoad() {
    this.logProvider.getLogList().on("value", logListSnapshot => {
      this.logList = [];
      logListSnapshot.forEach(snap => {
        this.logList.push({
          id: snap.key,
          log: snap.val().log,
          painlevel: snap.val().painlevel,
          time: snap.val().time,
          date: snap.val().date
        });
        return false;
      });
    });

    this.diaryProvider.getDiary().on("value", diaryLogSnapshot => {
      this.diaryLog = [];
      diaryLogSnapshot.forEach(snap => {
        this.diaryLog.push({
          id: snap.key,
          diary: snap.val().diary,
          date: snap.val().date
        });
        return false;
      });
    });

  }

} 
