import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from '../../providers/auth/auth';
import { ToastService } from "../../services/toast/toast.service";
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userProfile: any;
  public userName: string;
  public Country: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider, public profileProvider: ProfileProvider, private toast: ToastService, public translateService: TranslateService) {}

  verifyAccount(): void {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
    this.toast.show(`Email verfication has been sent!`);
  }

  updateUserName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your username",
      inputs: [
        {
          name: "userName",
          placeholder: "Your current username",
          value: this.userProfile.userName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateUsername(data.userName);
          }
        }
      ]
    });
    alert.present();
  }

  updateCountry(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your country",
      inputs: [
        {
          name: "Country",
          placeholder: "Your current country",
          value: this.userProfile.Country
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateCountry(data.Country);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email'
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Succesfully'); })
              .catch(error => { console.log('ERROR:' + error.message); });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'New password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Old password',
          type: 'password'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword, data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }
  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.userName = userProfileSnapshot.val().userName;
    });
  }

}
