import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class DiaryProvider {

  public diaryLogRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.diaryLogRef = firebase
        .database()
        .ref(`/userProfile/${user.uid}/diary`)
      }
    });
  }

  createDiary(diaryEntry: string, dateEntry: string): firebase.database.ThenableReference {
    return this.diaryLogRef.push({
      diary: diaryEntry,
      date: dateEntry
    });
  }

  getDiary(): firebase.database.Reference {
    return this.diaryLogRef;
  }

}