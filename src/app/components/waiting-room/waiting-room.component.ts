import { Component, OnInit, NgZone } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDetail } from '../../models/room-detail';
import { Player } from '../../models/player';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  isWait = true;
  isSpy = false;
  displayPosition = true;
  roomCode: string;
  roomDetail: RoomDetail;
  uniqCode: string;
  urlWaitingRoomWithRoomCode: string;
  isQrDisplay = false;
  time;
  location: string;
  locations;
  playerInGame: Array<Player>;
  myPlayer: Player;
  instanceTime;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spyfallService: SpyfallService
  ) {
      this.spyfallService.setRoomCode(this.activatedRoute.snapshot.paramMap.get('roomCode'));
      this.roomCode = this.spyfallService.getRoomCode();
      this.urlWaitingRoomWithRoomCode = `${environment.baseUrl}/waiting-room/${this.roomCode}`;
      this.uniqCode = this.spyfallService.getMyUniqId();
      this.roomDetail = new RoomDetail();
      if (typeof this.spyfallService.getMyName() === 'undefined') {
        this.router.navigate(['/join-room']);
      }
  }

  ngOnInit() {
    console.log('Role User : ' + this.spyfallService.getIsOwnRoom());

    this.spyfallService.connectRoom();

    this.spyfallService.receiveDetailRoom().subscribe( (result) => {
      Object.assign(this.roomDetail, result);
      this.isWait = !this.roomDetail.is_play;
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

    this.spyfallService.receiveRenderGame().subscribe( (result: RoomDetail) => {
      this.isWait = !result.is_play;
      this.location = result.location;
      this.locations = result.locations;
      this.playerInGame = result.players;
      for (let i = 0; i < this.playerInGame.length; i++) {
        if (this.playerInGame[i].uniq_code === this.spyfallService.getMyUniqId()) {
          this.myPlayer = this.playerInGame[i];
          i = this.playerInGame.length;
        }
      }
      let timer = result.time_per_round * 60, minutes, seconds;
      this.instanceTime = setInterval(() => {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        this.time = minutes + ':' + seconds;
        if (--timer < 0) {
            alert('หมดเวลากรุณายกมือ ชี้สายลับ');
            timer = 0;
            clearInterval(this.instanceTime);
        }
      } , 1000);
    });
  }

  countDownTimeAndDisPlay(roomTime: number) {
    const timer = roomTime * 60;
    let minutes, seconds;
    minutes = parseInt((timer / 60).toString(), 10);
    seconds = parseInt((timer % 60).toString(), 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    this.time = minutes + ':' + seconds;
  }

  kickUser(player: Player) {
    this.spyfallService.tellServerKickUser(player);
  }

  exitGame() {
    const player = new Player();
    player.uniq_code = this.spyfallService.getMyUniqId();
    this.kickUser(player);
    this.spyfallService.setRoomCode('');
    this.spyfallService.tellServerDisconnect();
  }

  displayQrCode() {
    this.isQrDisplay = !this.isQrDisplay;
  }

  startGame() {
    this.spyfallService.tellServerStartGame(this.roomDetail);
  }

  endGame() {
    clearInterval(this.instanceTime);
    this.spyfallService.tellServerEndGame();
  }

  showhide() {
    this.displayPosition = !this.displayPosition;
  }

}

