import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: any;
  readonly url: string = 'http://localhost:3001/';
  constructor() {
    // init the socket.
    this.socket = io(this.url);
  }

  listen(eventName: string): Observable<any> {
    return new Observable<any>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
