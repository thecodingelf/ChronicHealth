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

  // Changes the style of the content element.
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;

  // Changes the style of the text element.
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  logs: string = "logyourpain";

  date: any = Date();

  diaryEntry: string = '';

  // Array of the diary entries.
  public diaryLog: Array<any>;

  // Array of the log entries.
  public logList: Array<any>;

  constructor(private popoverCtrl: PopoverController, private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public diaryProvider: DiaryProvider, public translateService: TranslateService, public alertCtrl: AlertController, public modalCtrl: ModalController) { }

  // Open the popover menu for style customization options.
  presentPopover(ev) {

    let popover = this.popoverCtrl.create('PopoverPage', {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  // Open the modal page of the each log entry in their own contents.
  openModal(logId): void {
    this.navCtrl.push('ModalPage', { logId: logId });
  }
  
  // Creates a new diary entry.
  createDiary(diaryEntry: string = '', dateEntry: string): void {
    this.diaryProvider
      .createDiary(diaryEntry, dateEntry)
      .then(newDiary => { 
       });
       // Returns empty input field after submitting the diary entry.
       this.diaryEntry = '';
  }

  // Opens a new page for writing the log entry.
  goToAddLog(): void {
    this.navCtrl.push('AddLogPage');
  }

/* removeItem(itemId: any): void {
    this.logListRef.remove(itemId);
  } */

  // Logs out the user and redirects to the login screen.
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage').then(() => this.toast.show(`Succesfully Logout`));
    });
  }

  // Here the content is being loaded and updated to the view from database.
  ionViewDidLoad() {

    // Gets the contents of the log entries and to display them in the view.
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

    // Gets the contents of the diary entries and to display them in the view.
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