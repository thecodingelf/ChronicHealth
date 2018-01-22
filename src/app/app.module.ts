import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Translate language.
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
// Firebase, angularfire2.
import { AngularFireDatabaseModule } from "angularfire2/database";
// Providers.
import { AuthProvider } from '../providers/auth/auth';
import { LogProvider } from '../providers/log/log';
import { ProfileProvider } from '../providers/profile/profile';
// Services.
import { ToastService } from '../services/toast/toast.service';
import { ChatProvider } from '../providers/chat/chat';
import { DiaryProvider } from '../providers/diary/diary';
import { environment } from './environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    LogProvider,
    ProfileProvider,
    ToastService,
    ProfileProvider,
    ChatProvider,
    DiaryProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }