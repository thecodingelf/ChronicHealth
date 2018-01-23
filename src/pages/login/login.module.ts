import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// Language Translate.
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginPage } from './login';
import { createTranslateLoader } from '../../app/app.module';
import { LanguageSelectorComponent } from '../../app/language-selector/language-selector.component';
import {JsonFileService} from '../../app/services/json-file.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    LoginPage,
    LanguageSelectorComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    JsonFileService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule {}
