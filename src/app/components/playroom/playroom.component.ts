import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.css']
})
export class PlayroomComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ngZone: NgZone
  ) { }

  is_wait = true;
  room_code;
  memberList = [];
  spyfallService: any;

  ngOnInit() {
    this.room_code = this.activatedRoute.snapshot.paramMap.get('room_code');
    const nickname = this.activatedRoute.snapshot.paramMap.get('memberName');
    const timePerRound = this.activatedRoute.snapshot.paramMap.get('timePerRound');
    this.spyfallService = new SpyfallService(this._ngZone, nickname, this.room_code, timePerRound);
    this.spyfallService.getMessage().subscribe(result => {
      this._ngZone.run(() => {
        this.memberList = Object.assign(this.memberList , result);
      });
    });
  }

  startgame() {
    this.is_wait = false;
  }

  endgame() {
    this.is_wait = true;
  }

}
