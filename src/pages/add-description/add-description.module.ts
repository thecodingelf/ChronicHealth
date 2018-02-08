import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDescriptionPage } from './add-description';

@NgModule({
  declarations: [
    AddDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDescriptionPage),
  ],
})
export class AddDescriptionPageModule {}
