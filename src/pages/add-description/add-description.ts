import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DescriptionProvider } from './../../providers/description/description';

@IonicPage()
@Component({
  selector: 'page-add-description',
  templateUrl: 'add-description.html',
})
export class AddDescriptionPage {

  constructor(public navCtrl: NavController, public descriptionProvider: DescriptionProvider, public navParams: NavParams) {
  }

    // Creates the log entry to the database and directs user back to main screen.
    addDescription(painHeader: string, painDescription: string, painSeverity: number): void {
      this.descriptionProvider
        .createLog(painHeader, painDescription, painSeverity)
        .then(newDescription => {
          this.navCtrl.pop();
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDescriptionPage');
  }

}
