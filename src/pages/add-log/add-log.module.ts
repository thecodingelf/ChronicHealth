import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// Language Translate.
import { TranslateModule } from '@ngx-translate/core';
import { AddLogPage } from './add-log';

@NgModule({
  declarations: [
    AddLogPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLogPage),
    TranslateModule.forChild()
  ],
})
export class AddLogPageModule {}
