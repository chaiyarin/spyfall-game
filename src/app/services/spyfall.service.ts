import { Injectable, NgZone } from '@angular/core';
import { Socket } from 'ng6-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SpyfallService extends Socket {

  constructor(private _ngZone: NgZone) {
    super({ url: 'http://localhost:3000', options: {} }, _ngZone);
  }

  sendMessage(msg: string) {
    this.emit('client-to-server2', msg);
  }

  getMessage() {
      return this.fromEvent('server-to-client2');
  }
}
