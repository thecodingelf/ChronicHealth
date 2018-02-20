import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ProfileProvider {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  public userName: firebase.database.Reference;

  constructor() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    })

  } 

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateUsername(userName: string): Promise<any> {
    return this.userProfile.update({ userName });
  }

  getUserName(): firebase.database.Reference {
    return this.userName;
  }

  updateCountry(Country: string): Promise<any> {
    return this.userProfile.update({ Country });
  }

  updateAge(Age: number): Promise<any> {
    return this.userProfile.update({ Age });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {

    const credential: firebase.auth.AuthCredential = firebase.auth
      .EmailAuthProvider.credential(
      this.currentUser.email,
      password
      );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })

      .catch(error => {
        console.error(error);
      })
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth
      .EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
      );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })

      .catch(error => {
        console.error(error);
      });
  }

}
