import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// Language Translate.
import { TranslateModule } from '@ngx-translate/core';
import { RateMyPainPage } from './rate-my-pain';

@NgModule({
  declarations: [
    RateMyPainPage,
  ],
  imports: [
    IonicPageModule.forChild(RateMyPainPage),
    TranslateModule.forChild()
  ],
  entryComponents: [
    
  ],
})
export class RateMyPainPageModule {}
