import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// Language Translate.
import { TranslateModule } from '@ngx-translate/core';
import { LiveStreamPage } from './live-stream';

@NgModule({
  declarations: [
    LiveStreamPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveStreamPage),
    TranslateModule.forChild()
  ],
})
export class LiveStreamPageModule {}
