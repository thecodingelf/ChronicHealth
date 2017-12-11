import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';

// Service.
import { ToastService } from "../../services/toast/toast.service";
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public logList: Array<any>; 

  constructor(private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public translateService: TranslateService) {}

  ionViewDidLoad() {
    this.logProvider.getLogList().on("value", logListSnapshot => {
      this.logList = [];
      logListSnapshot.forEach(snap => {
        this.logList.push({
          id: snap.key,
          log: snap.val().log,
          painlevelbefore: snap.val().painlevelbefore,
          painlevelafter: snap.val().painlevelafter,
          time: snap.val().time,
          date: snap.val().date
        });
        return false;
      });
    });
  }

}
