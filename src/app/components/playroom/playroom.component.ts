import { Component, OnInit } from '@angular/core';
import { SpyfallService } from '../../services/spyfall.service';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.css']
})
export class PlayroomComponent implements OnInit {

  constructor(private spyfallService: SpyfallService) { }

  ngOnInit() {
    this.spyfallService.sendMessage('Test Send Message');
    this.spyfallService.getMessage().subscribe((result) => {
      console.log('Test Get Message');
      console.log(result);
    });
  }

}
