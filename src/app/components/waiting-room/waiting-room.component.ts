import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ngZone: NgZone,
    private router: Router
  ) { }

  is_wait = true;
  room_code;
  // friend_list = [];
  friend_list = [];
  friend_list_in_game_play = [];
  location_list = [];
  is_spy = false;
  myid;
  intance_time;
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
    this.spyfallService.getRoomDetail().subscribe(result => {
      this._ngZone.run(() => {
      if (result.game_start_already) {
        this.is_wait = false;
        const dateTwo = new Date(result.start_time);
        const secondBetweenTwoDate = Math.abs((new Date().getTime() - dateTwo.getTime()) / 1000);
        const timeReal = result.time_round - Math.ceil(secondBetweenTwoDate);
        let timer = timeReal, minutes, seconds;
        clearInterval(this.intance_time);
        this.intance_time = setInterval(() => {
          minutes = parseInt((timer / 60).toString(), 10);
          seconds = parseInt((timer % 60).toString(), 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          this.time = minutes + ':' + seconds;

          if (--timer < 0) {
              alert('หมดเวลากรุณายกมือ ชี้สายลับ');
              clearInterval(this.intance_time);
          }
        } , 1000);
      } else {
        this.is_wait = true;
        clearInterval(this.intance_time);
      }
      });
    });
    this.spyfallService.getMessage().subscribe(result => {
      this._ngZone.run(() => {
        this.friend_list = Object.assign([] , result);
      });
    });
    this.spyfallService.getResultKick().subscribe(result => {
      this._ngZone.run(() => {
       if (result === this.myid) {
        this.router.navigate(['/']);
       }
      });
    });
    this.spyfallService.rendergame().subscribe(result => {
      this._ngZone.run(() => {
        this.location = result.location;
        this.location_list = result.location_list;
        this.friend_list_in_game_play = Object.assign([] , result.friend_list);
        for (let i = 0, l = this.friend_list_in_game_play.length; i < l; i++) {
          if (this.friend_list_in_game_play[i].myid === this.myid && this.friend_list_in_game_play[i].position === 'spy') {
            this.is_spy = true;
            this.my_position = this.friend_list_in_game_play[i].position;
          } else if (this.friend_list_in_game_play[i].myid === this.myid) {
            this.is_spy = false;
            this.my_position = this.friend_list_in_game_play[i].position;
          }
        }
        let timer = result.timer, minutes, seconds;
        clearInterval(this.intance_time);
        this.intance_time = setInterval(() => {
          minutes = parseInt((timer / 60).toString(), 10);
          seconds = parseInt((timer % 60).toString(), 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          this.time = minutes + ':' + seconds;

          if (--timer < 0) {
              alert('หมดเวลากรุณายกมือ ชี้สายลับ');
              clearInterval(this.intance_time);
          }
        } , 1000);
        // this.is_wait = false;
      });
    });
    this.spyfallService.response_gameend().subscribe(result => {
      this._ngZone.run(() => {
        // this.is_wait = true;
      });
    });
  }

  startgame() {
    this.spyfallService.startgame(this.room_code);
  }

  endgame() {
    this.spyfallService.endgame();
    clearInterval(this.intance_time);
  }

  kick(user: any) {
    this.spyfallService.removeUser(user);
  }

  exit_game() {
    this.spyfallService.exitgame(this.myid);
  }

  countdown_time(duration: number, display: any) {

    let timer = duration;
    let minutes, seconds;
    setInterval(function () {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display = minutes + ':' + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
  }

}

