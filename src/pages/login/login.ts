import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

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

  public flagRef: any;
  public flag: any;

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder, public translate: TranslateService) {

    this.logoRef = firebase.storage().ref().child('img/');

    this.logoRef.child('ch.png').getDownloadURL().then((url) => {
      this.logo = url;

    });

    this.flagRef = firebase.storage().ref().child('flags/');

    this.flagRef.child('Finland.png').getDownloadURL().then((url) => {
      this.flag = url;
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

    /* translate.addLangs(["fi", "en", "po", "gr"]);
    translate.setDefaultLang('fi'); */

    /* let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/fi|en/) ? browserLang : 'fi'); */

    /*     this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    
          if (event.lang == 'fi') {
            this.translate.setDefaultLang('fi');
          }
    
          else if (event.lang == 'en') {
            this.translate.setDefaultLang('en');
          }
    
          else if (event.lang == 'np') {
            this.translate.setDefaultLang('np');
          }
    
          else if (event.lang == 'gr') {
            this.translate.setDefaultLang('gr');
          }
    
          else if (event.lang == 'po') {
            this.translate.setDefaultLang('po');
          }
    
          else if (event.lang == 'pl') {
            this.translate.setDefaultLang('pl');
          }    
    
          console.log('Language changed ' + this.translate.currentLang);
        }); */

  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
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
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

  goToRegister(): void {
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
