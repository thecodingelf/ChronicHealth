import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';
import { DiaryProvider } from '../../providers/diary/diary';
// Service.
import { ToastService } from "../../services/toast/toast.service";


@IonicPage()
@Component({
  selector: 'page-rate-my-pain',
  templateUrl: 'rate-my-pain.html',
})
export class RateMyPainPage {

  logs: string = "logyourpain";

  public diaryLog: Array<any>;

  public logList: Array<any>;

  constructor(private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public diaryProvider: DiaryProvider) {
  }

  createDiary(diaryEntry: string): void {
    this.diaryProvider
      .createDiary(diaryEntry)
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
          time: snap.val().time
        });
        return false;
      });
    });

    this.diaryProvider.getDiary().on("value", diaryLogSnapshot => {
      this.diaryLog = [];
      diaryLogSnapshot.forEach(snap => {
        this.diaryLog.push({
          id: snap.key,
          diary: snap.val().diary
        });
        return false;
      });
    });

  }

} 
