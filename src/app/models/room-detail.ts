import { Player } from './player';
import { Location } from './location';
export class RoomDetail {
  room_code: string;
  time_per_round: number;
  location: string;
  is_play: boolean;
  start_game_time: Date;
  players: Array<Player>;
  locations: Array<Location>;

  constructor() {
    this.room_code = '';
    this.is_play = false;
    this.location = '';
    this.time_per_round = 0;
    this.start_game_time = null;
    this.players = new Array();
    this.locations = new Array();
  }
}
