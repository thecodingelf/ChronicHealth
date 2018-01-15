import { Injectable } from '@angular/core';
// Firebase.
import firebase from 'firebase';

@Injectable()
export class LogProvider {

  // Reference to the loglist in database.
  public logListRef: firebase.database.Reference;

  // Added log entries from user goes here.
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.logListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/logList`);
      }
    });
  }

  // Creates the log entry.
  createLog(logActivity: string, logPainLevelBefore: number, logPainLevelAfter: number, logTime: string, logDate: string): firebase.database.ThenableReference {
    return this.logListRef.push({
      log: logActivity,
      painlevelbefore: logPainLevelBefore,
      painlevelafter: logPainLevelAfter,
      date: firebase.database.ServerValue.TIMESTAMP,
      time: firebase.database.ServerValue.TIMESTAMP
/*    time: logTime,
      date: logDate */
    });
  }

  // Gets the log entries from the referred list.
  getLogList(): firebase.database.Reference {
    return this.logListRef;
  }

  // Gets the details of the specific log entry.
  getLogDetail(logId: string): firebase.database.Reference {
    return this.logListRef.child(logId);
  }

}