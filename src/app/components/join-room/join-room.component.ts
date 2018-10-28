import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor() { }

  room_code;
  memberName;
  timePerRound = 1993;

  ngOnInit() {
  }

}
