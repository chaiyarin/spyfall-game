import { Component, OnInit } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';

@Component({
  selector: 'app-creater-room',
  templateUrl: './creater-room.component.html',
  styleUrls: ['./creater-room.component.css']
})
export class CreaterRoomComponent implements OnInit {

  constructor(private spyfallService: SpyfallService) { }

  memberName: string;
  timePerRound: number;
  roomCode = Math.random().toString(36).substring(7);

  ngOnInit() {
    this.spyfallService.setIsOwnRoom(true);
  }

  setName() {
    this.spyfallService.setName(this.memberName);
  }

  setTime() {
    this.spyfallService.setTimePerRound(this.timePerRound);
  }

}
