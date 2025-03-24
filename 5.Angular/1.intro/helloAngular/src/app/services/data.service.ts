import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private variable messages
  private message = 'Hello from data service'

  //getter for the message
  getMessage():string {
    return this.message;
  }

  // setter for the message

  setMessage(newMessage: string) {
    this.message = newMessage;
  }


}
