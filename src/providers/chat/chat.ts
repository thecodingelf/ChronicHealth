import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ChatProvider {

  public Chat: firebase.database.Reference;

  constructor() {

    this.Chat = firebase
    .database()
    .ref(`/chat/messages`);

  }

  createMessage(chatName: string, chatMessage: string): firebase.database.ThenableReference {
    return this.Chat.push({
      chatname: chatName,
      chatmessage: chatMessage,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  }

}