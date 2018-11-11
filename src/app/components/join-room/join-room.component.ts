import { Component, OnInit } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor(private spyfallService: SpyfallService) { }

  room_code: string;
  memberName: string;

  ngOnInit() {
  }

  setMemberName() {
    this.spyfallService.setName(this.memberName);
  }

  setRoomCode() {
    this.spyfallService.setRoomCode(this.room_code);
  }

}
