import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class DiaryProvider {

  // Reference to diarylist in database.
  public diaryLogRef: firebase.database.Reference;

  // Added diary entries from user goes here.
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.diaryLogRef = firebase
        .database()
        .ref(`/userProfile/${user.uid}/diary`)
      }
    });
  }

  // Creates diary entry.
  createDiary(diaryEntry: string, dateEntry: string): firebase.database.ThenableReference {
    return this.diaryLogRef.push({
      diary: diaryEntry,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

  // Gets the diary entries from reffered list.
  getDiary(): firebase.database.Reference {
    return this.diaryLogRef;
  }

}