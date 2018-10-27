import { Injectable, NgZone } from '@angular/core';
import { Socket } from 'ng6-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SpyfallService extends Socket {

  room_code = '0870940955';

  constructor(_ngZone: NgZone,
    nickname: string,
    room_code: string,
    time_round: string
  ) {
    super(
      { url: 'http://localhost:3000',
        options: {
          query: {
                    nickname: nickname,
                    room_code: room_code,
                    time_round: time_round
          }
        }
      }, _ngZone);
      this.room_code = room_code;
    }

  addMemberToServer(memberName: string) {
    const jsonTest = { code: this.room_code, member_name: memberName};
    this.emit('client-to-server2', jsonTest);
  }

  getMessage() {
      return this.fromEvent(this.room_code);
  }
}
