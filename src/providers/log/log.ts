import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class LogProvider {

  public logListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.logListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/logList`);
      }
    });
  }

  createLog(logActivity: string, logPainLevelBefore: number, logPainLevelAfter: number, logTime: string, logDate: string = new Date().toISOString()): firebase.database.ThenableReference {
    return this.logListRef.push({
      log: logActivity,
      painlevelbefore: logPainLevelBefore,
      painlevelafter: logPainLevelAfter,
      time: logTime,
      date: logDate
    });
  }

  getLogList(): firebase.database.Reference {
    return this.logListRef;
  }

}