import { Injectable } from '@angular/core';
// Firebase.
import firebase from 'firebase';


@Injectable()
export class DescriptionProvider {
// Reference to the severity descriptions in database.
public severityDescriptionRef: firebase.database.Reference;

// Added description entries from user goes here.
constructor() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.severityDescriptionRef = firebase
        .database()
        .ref(`/severitydescriptions`);
    }
  });
}

// Creates the severity description entry.
createLog(painHeader: string, painDescription: string, painSeverity: number): firebase.database.ThenableReference {
  return this.severityDescriptionRef.push({
    header: painHeader,
    paindescription: painDescription,
    painseverity: painSeverity,
  });
}

// Gets the description entries from the referred list.
getDescriptions(): firebase.database.Reference {
  return this.severityDescriptionRef;
}

}
