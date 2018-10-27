import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creater-room',
  templateUrl: './creater-room.component.html',
  styleUrls: ['./creater-room.component.css']
})
export class CreaterRoomComponent implements OnInit {

  constructor() { }

  room_code = Math.random().toString(36).substring(7);

  ngOnInit() {
  }

}
