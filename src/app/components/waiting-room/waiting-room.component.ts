import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ngZone: NgZone
  ) { }

  is_wait = true;
  room_code;
  memberList = [];
  is_spy = false;
  myid;
  spyfallService: any;

  ngOnInit() {
    this.myid = Math.random().toString(36).substring(7);
    this.room_code = this.activatedRoute.snapshot.paramMap.get('room_code');
    const nickname = this.activatedRoute.snapshot.paramMap.get('friend_name');
    const timePerRound = this.activatedRoute.snapshot.paramMap.get('time');
    this.spyfallService = new SpyfallService(this._ngZone, nickname, this.room_code, timePerRound, this.myid);
    this.spyfallService.getMessage().subscribe(result => {
      this._ngZone.run(() => {
        this.memberList = Object.assign(this.memberList , result);
      });
    });
    this.spyfallService.rendergame().subscribe(result => {
      console.log(result);
      this._ngZone.run(() => {
        this.memberList = Object.assign(this.memberList , result);
        for (let i = 0, l = this.memberList[this.room_code].length; i < l; i++) {
          if (this.memberList[this.room_code][i].myid === this.myid && this.memberList[this.room_code][i].position === 'spy') {
            this.is_spy = true;
          }
          if (this.memberList[this.room_code][i].myid === this.myid && this.memberList[this.room_code][i].position === '') {
            this.is_spy = false;
          }
        }
        this.is_wait = false;
      });
    });
  }

  startgame() {
    this.spyfallService.startgame(this.room_code);
  }

  endgame() {
    this.is_wait = true;
  }

  kick(user: any) {
    this.spyfallService.removeUser(user);
  }

}

