import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';
import { DiaryProvider } from '../../providers/diary/diary';
// Service.
import { ToastService } from "../../services/toast/toast.service";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-rate-my-pain',
  templateUrl: 'rate-my-pain.html',
})

export class RateMyPainPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  logs: string = "logyourpain";

  date: any = Date();

  public diaryLog: Array<any>;

  public logList: Array<any>; 

  constructor(private popoverCtrl: PopoverController, private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public diaryProvider: DiaryProvider, public translateService: TranslateService, public alertCtrl: AlertController, public modalCtrl: ModalController) { }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create('PopoverPage', {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  openModal(): void {
    this.navCtrl.push('ModalPage');
  }

/*   openModal(id) {
    this.navCtrl.push(SubHomePage, { id: id });
} */

  createDiary(diaryEntry: string = '', dateEntry: any = new Date()): void {
    this.diaryProvider
      .createDiary(diaryEntry, dateEntry)
      .then(newDiary => { });
  }

  goToAddLog(): void {
    this.navCtrl.push('AddLogPage');
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  ionViewDidLoad() {
    this.logProvider.getLogList().on("value", logListSnapshot => {
      this.logList = [];
      logListSnapshot.forEach(snap => {
        this.logList.push({
          id: snap.key,
          log: snap.val().log,
          painlevelbefore: snap.val().painlevelbefore,
          painlevelafter: snap.val().painlevelafter,
          time: snap.val().time,
          date: snap.val().date
        });
        return false;
      });
    });

    this.diaryProvider.getDiary().on("value", diaryLogSnapshot => {
      this.diaryLog = [];
      diaryLogSnapshot.forEach(snap => {
        this.diaryLog.push({
          id: snap.key,
          diary: snap.val().diary,
          date: snap.val().date
        });
        return false;
      });
    });

  }

} 