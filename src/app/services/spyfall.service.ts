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
    time_round: string,
    myid: string
  ) {
    super(
      { url: 'http://localhost:3000',
        options: {
          query: {
                    nickname: nickname,
                    room_code: room_code,
                    time_round: time_round,
                    myid: myid
          }
        }
      }, _ngZone);
      this.room_code = room_code;
    }

  getMessage() {
    return this.fromEvent(this.room_code);
  }

  startgame(room_code: string) {
    this.emit('startgame', room_code);
  }

  rendergame() {
    return this.fromEvent('game-start-' + this.room_code);
  }

  removeUser(user: any) {
    this.emit('kick-user', user);
  }
}
