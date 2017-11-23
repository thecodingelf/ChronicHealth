import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastService } from "../../services/toast/toast.service";
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase'; 


@IonicPage()
@Component({
  selector: 'page-live-stream',
  templateUrl: 'live-stream.html',
})
export class LiveStreamPage {

  ref;
  name;
  newmessage;
  messagesList;

  constructor(private toast: ToastService, public navCtrl: NavController, public alert: AlertController, public authProvider: AuthProvider, public translateService: TranslateService) {

    this.ref = firebase.database().ref('messages');

  }

  sendMessage(): void {
    this.ref.push({
      name: this.name.chatname,
      message: this.newmessage
    });
  } 

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  ionViewDidLoad() {

    this.alert.create({
      title: 'Chat',
      inputs: [{
        name: 'Chat Käyttäjänimi',
        placeholder: 'chat käyttäjänimi'
      }],
      buttons: [{
        text: 'Jatka',
        handler: chatname => {
          this.name = chatname
        }
      }]
    }).present();

    this.ref.on('value', data => {
      let tmp = [];
      data.forEach( data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message
        })
      });
      this.messagesList = tmp;
    });

  }

}
