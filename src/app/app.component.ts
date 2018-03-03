import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, Config, NavController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Providers.
import { AuthProvider } from '../providers/auth/auth';
// Service.
import { ToastService } from "../services/toast/toast.service";
// Firebase.
import * as firebase from 'firebase';
import { Unsubscribe } from 'firebase/app';
import { FIREBASE_CONFIG } from './credentials';
// Language translate.
import { TranslateService } from '@ngx-translate/core';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string;

  terms = "{{ 'TERMS' | translate}}";

  pages: Array<{ title: string, component: any }>;

  constructor(@Inject('defaultLanguage')
  private defaultLanguage: string,
    private toast: ToastService,
    private translate: TranslateService,
    private config: Config,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController
  ) {

    // Initiliazes the default language.
    translate.setDefaultLang(defaultLanguage);

    translate.use(localStorage['language'] || defaultLanguage);

    // Initializes the firebase for the application.
    firebase.initializeApp(FIREBASE_CONFIG);

    // Takes user to login screen if they are not logged in.
    // Takes user to home screen if they are logged in before.
    /*     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            this.rootPage = 'LoginPage';
            unsubscribe();
          } else {
            this.rootPage = 'HomePage';
            unsubscribe();
          }
        }); */

    const unsubscribe: Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          if (!user.emailVerified) {
            // User can't stay logged in application after closing if not have verfied the email.
            // Toast will notify user that they need to verify email before they can log in.
            this.toast.show(`Email hasn't been verified!`)
            this.nav.setRoot('LoginPage');
          } else {
            this.rootPage = 'HomePage';
            unsubscribe();
          }
        } else {
          this.rootPage = 'LoginPage';
          unsubscribe();
        }
      });

    // Content of the sidemenu.
    this.pages = [
      { title: 'Profiili', component: 'ProfilePage' },
      { title: 'Graphs', component: 'GraphsPage' }
      /*    { title: 'Description', component: 'AddDescriptionPage' }, */
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  goHome(): void {
    this.nav.setRoot('HomePage')
  }

  // Takes the user to the terms & conditions page.
  termConditions(): void {
    this.nav.push('TermsConditionsPage')
  }

  // Logs off the user and redirects to login screen.
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.nav.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  // Opens the pages inside the submenu.
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

}