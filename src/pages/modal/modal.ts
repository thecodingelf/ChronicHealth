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

  }

}
