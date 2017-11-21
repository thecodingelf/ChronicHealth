import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveStreamPage } from './live-stream';

@NgModule({
  declarations: [
    LiveStreamPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveStreamPage),
  ],
})
export class LiveStreamPageModule {}
