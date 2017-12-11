import { Component, ViewChild } from '@angular/core';
import { Platform, Config, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Providers.
import { AuthProvider } from '../providers/auth/auth';
// Service.
import { ToastService } from "../services/toast/toast.service";
// Firebase.
import firebase from 'firebase';
import { FIREBASE_CONFIG } from './credentials';
// Language translate.
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string;

  pages: Array<{ title: string, component: any }>;

  constructor(private toast: ToastService, private translate: TranslateService, private config: Config, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authProvider: AuthProvider) {

    firebase.initializeApp(FIREBASE_CONFIG);

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = 'HomePage';
        unsubscribe();
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profiili', component: 'ProfilePage' },
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initTranslate();

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('fi');

    /*    if (this.translate.getBrowserLang() !== undefined) {
          this.translate.use(this.translate.getBrowserLang());
        } else {
          this.translate.use('fi'); // Set your language here
        }  */

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.nav.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

}

