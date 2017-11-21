import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
//import { ToastService } from './../../services/toast/toast.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider) { }

  /*
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  } */

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
