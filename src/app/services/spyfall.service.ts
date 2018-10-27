import { Injectable, NgZone } from '@angular/core';
import { Socket } from 'ng6-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SpyfallService extends Socket {

  client_code = '0870940955';

  constructor(private _ngZone: NgZone) {
    super({ url: 'http://localhost:3000', options: { query: { username: 123} } }, _ngZone);
  }

  addMemberToServer(memberName: string) {
    const jsonTest = { code: this.client_code, member_name: memberName};
    this.emit('client-to-server2', jsonTest);
  }

  getMessage() {
      return this.fromEvent(this.client_code);
  }
}
