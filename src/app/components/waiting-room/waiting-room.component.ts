import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDetail } from '../../models/room-detail';
import { Player } from '../../models/player';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  isWait = true;
  roomCode: string;
  roomDetail: RoomDetail;
  uniqCode: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spyfallService: SpyfallService
  ) {
    this.spyfallService.setRoomCode(this.activatedRoute.snapshot.paramMap.get('roomCode'));
    this.uniqCode = this.spyfallService.getMyUniqId();
    this.roomDetail = new RoomDetail();
    if (typeof this.spyfallService.getMyName() === 'undefined') {
      this.router.navigate(['/join-room']);
    }
  }

  ngOnInit() {

    this.roomCode = this.spyfallService.getRoomCode();

    this.spyfallService.connectRoom();

    this.spyfallService.receiveDetailRoom().subscribe( (result) => {
      Object.assign(this.roomDetail, result);
    });

    this.spyfallService.receiveNoRoomCodeExist().subscribe( (result) => {
      if (result) {
        alert('รหัสห้อง ' + this.spyfallService.getRoomCode() + ' ไม่มีอยู่ในระบบ กรุณาหรอกรหัสห้องใหม่');
        this.router.navigate(['/join-room']);
      }
    });

    this.spyfallService.receiveKickUser().subscribe( (result: any) => {
      if (result.uniq_code === this.spyfallService.getMyUniqId()) {
        this.router.navigate(['/']);
      }
    });
  }

  kickUser(player: Player) {
    this.spyfallService.tellServerKickUser(player);
  }

  exitGame() {
    const player = new Player();
    player.uniq_code = this.spyfallService.getMyUniqId();
    this.kickUser(player);
  }

}

