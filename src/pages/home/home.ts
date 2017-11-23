import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider, public translateService: TranslateService) { }

  goToProfile(): void {
    this.navCtrl.push('ProfilePage');
  }

  showRateMyPain(): void {
    this.navCtrl.push('RateMyPainPage');
  }

  showLiveStream(): void {
    this.navCtrl.push('LiveStreamPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
