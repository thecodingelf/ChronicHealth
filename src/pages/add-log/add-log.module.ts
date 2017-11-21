import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLogPage } from './add-log';

@NgModule({
  declarations: [
    AddLogPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLogPage),
  ],
})
export class AddLogPageModule {}
