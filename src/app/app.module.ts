import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LogProvider,
    ProfileProvider,
    ToastService,
    ProfileProvider,
    ChatProvider
  ]
})
export class AppModule {}
