import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';
import { ToastService } from "../../services/toast/toast.service";


@IonicPage()
@Component({
  selector: 'page-rate-my-pain',
  templateUrl: 'rate-my-pain.html',
})
export class RateMyPainPage {

  public logList: Array<any>;

  constructor(private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider) {
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
  }

} 
