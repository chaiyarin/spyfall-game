import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.css']
})
export class PlayroomComponent implements OnInit {

  constructor(private spyfallService: SpyfallService,
  private activatedRoute: ActivatedRoute,
  private _ngZone: NgZone) { }

  is_wait = true;
  room_code = '0870940955';
  memberList = [];

  ngOnInit() {
    const memberName = this.activatedRoute.snapshot.paramMap.get('memberName');
    const timePerRound = this.activatedRoute.snapshot.paramMap.get('timerPerRound');
    this.spyfallService.addMemberToServer(memberName);
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
