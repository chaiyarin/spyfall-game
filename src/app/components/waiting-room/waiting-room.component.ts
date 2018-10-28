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
  friend_list = [];
  is_spy = false;
  myid;
  location;
  my_position;
  time;
  spyfallService: any;

  ngOnInit() {
    this.myid = Math.random().toString(36).substring(7);
    this.room_code = this.activatedRoute.snapshot.paramMap.get('room_code');
    const nickname = this.activatedRoute.snapshot.paramMap.get('friend_name');
    const timePerRound = parseInt(this.activatedRoute.snapshot.paramMap.get('time'), 10);
    this.spyfallService = new SpyfallService(this._ngZone, nickname, this.room_code, (timePerRound * 60), this.myid);
    this.spyfallService.getMessage().subscribe(result => {
      this._ngZone.run(() => {
        this.memberList = Object.assign(this.memberList , result);
      });
    });
    this.spyfallService.rendergame().subscribe(result => {
      console.log(result);
      this._ngZone.run(() => {
        this.location = result.location;
        this.time = result.time;
        this.friend_list = Object.assign(this.friend_list , result.friend_list);
        for (let i = 0, l = this.friend_list.length; i < l; i++) {
          if (this.friend_list[i].myid === this.myid && this.friend_list[i].position === 'spy') {
            this.is_spy = true;
            this.my_position = this.friend_list[i].position;
          }
          if (this.friend_list[i].myid === this.myid && this.friend_list[i].position === '') {
            this.is_spy = false;
          }
        }
        let timer = result.timer, minutes, seconds;
        const intance_time = setInterval(() => {
          minutes = parseInt((timer / 60).toString(), 10);
          seconds = parseInt((timer % 60).toString(), 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          this.time = minutes + ':' + seconds;

          if (--timer < 0) {
              alert('หมดเวลากรุณายกมือ ชี้สายลับ');
              clearInterval(intance_time);
          }
        } , 1000);
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

  countdown_time(duration: number, display: any) {
    console.log(duration);
    let timer = duration;
    let minutes, seconds;
    setInterval(function () {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display = minutes + ':' + seconds;
        // console.log(this.time);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
  }

}

