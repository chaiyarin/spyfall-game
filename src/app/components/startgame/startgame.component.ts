import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startgame',
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.css']
})
export class StartgameComponent implements OnInit {

  constructor() { }

  room_code = Math.random().toString(36).substring(7);

  ngOnInit() {
  }

}
