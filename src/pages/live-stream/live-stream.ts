import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// Services.
import { TranslateService } from '@ngx-translate/core';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { ChatProvider } from './../../providers/chat/chat';
// Firebase.
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-live-stream',
  templateUrl: 'live-stream.html',
})
export class LiveStreamPage {

  ref;
  name;
  newmessage: string = '';
  messagesList;

  constructor(public navCtrl: NavController, public alert: AlertController, public authProvider: AuthProvider, public translateService: TranslateService) {

    // Reference to database where messages are being stored.
    this.ref = firebase.database().ref('chat/messages');

  }

  // Sends the chat message.
  sendMessage(): void {
    this.ref.push({
      name: this.name.chatname,
      message: this.newmessage,
      date: firebase.database.ServerValue.TIMESTAMP
    });
    this.newmessage = '';
  }

  ionViewDidLoad() {

    // Creates the chat name. | Needs better functionality.
    this.alert.create({
      title: 'Chat',
      inputs: [{
        name: 'chatname',
        placeholder: 'chat käyttäjänimi'
      }],
      buttons: [{
        text: 'Jatka',
        handler: chatname => {
          this.name = chatname
        }
      }]
    }).present();

    // Loads the chat messages from database.
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach( data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message,
          date: data.val().date
        })
      });
      this.messagesList = tmp;
    });

  }

}