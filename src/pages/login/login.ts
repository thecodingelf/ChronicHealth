import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Language translate.
import { TranslateService } from '@ngx-translate/core';
// Email validation.
import { EmailValidator } from '../../validators/email';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { ToastService } from './../../services/toast/toast.service';
// Firebase.
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  langs = ['en', 'fi', 'po', 'gr'];

  public logoRef: any;
  public logo: any;
  public languages: string;
  public flag: any;

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(private toast: ToastService, public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder, public translate: TranslateService) {

    this.logoRef = firebase.storage().ref().child('img/');

    this.logoRef.child('ch.png').getDownloadURL().then((url) => {
      this.logo = url;

    });

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

  }

  goToGuide(): void {
    this.navCtrl.push('AppInstructionsPage');
  }

  async loginUser(): Promise<void> {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      try {
        const loginUser: firebase.User = await this.authProvider.loginUser(email, password);
        await loading.dismiss();
        this.navCtrl.setRoot('HomePage');
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'Cancel' }]
        });
        alert.present();
      }
    }
  }

  /*    loginUser(): void {
       if (user) {
        if (!user.emailVerified) {
          this.loading = this.loadingCtrl.create();
          this.loading.present();
          this.navCtrl.setRoot('LoginPage')
          this.toast.show(`Email hasn't been verified`);
          }
       } else {
          const email = this.loginForm.value.email;
          const password = this.loginForm.value.password;
          this.authProvider.loginUser(email, password).then(
            authData => {
              this.loading.dismiss().then(() => {
                this.navCtrl.setRoot('HomePage');
              });
            },
            error => {
              this.loading.dismiss().then(() => {
                const alert: Alert = this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'Cancel' }]
                });
                alert.present();
              });
            }
          );
          this.loading = this.loadingCtrl.create();
          this.loading.present();
        }
      } */

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

  goToRegister(): void {
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

}
