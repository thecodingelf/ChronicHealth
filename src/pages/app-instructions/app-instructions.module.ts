import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// Language Translate.
import { TranslateModule } from '@ngx-translate/core';
import { AppInstructionsPage } from './app-instructions';


@NgModule({
  declarations: [
    AppInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppInstructionsPage),
    // To use translation services in other pages.
    TranslateModule.forChild()
  ],
})
export class AppInstructionsPageModule { }
