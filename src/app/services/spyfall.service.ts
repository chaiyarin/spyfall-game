import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';
import { RoomDetail } from '../models/room-detail';
import { Player } from '../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpyfallService {

  private socket;
  private apiUrl = environment.apiUrl;
  private myName: string;
  private roomCode: string;
  private isOwnRoom: boolean;
  private timePerRound: number;
  private myUniqId = Math.random().toString(36).substring(7);

  constructor() {
    this.socket = io.connect(this.apiUrl);
  }

  setName(name: string) {
    this.myName = name;
  }

  setRoomCode(roomCode: string) {
    this.roomCode = roomCode;
  }

  getRoomCode() {
    return this.roomCode;
  }

  setIsOwnRoom(isOwnRoom: boolean) {
    this.isOwnRoom = isOwnRoom;
  }

  getIsOwnRoom() {
    return this.isOwnRoom;
  }

  setTimePerRound(time: number) {
    this.timePerRound = time;
  }

  getTimePerRound() {
    return this.timePerRound;
  }

  getMyName() {
    return this.myName;
  }

  getMyUniqId() {
    return this.myUniqId;
  }

  connectRoom() {
    if (this.getIsOwnRoom()) {
      this.tellServerCreateRoom();
    } else {
      console.log(132);
      this.tellServerJoinRoom();
    }
  }

  tellServerCreateRoom() {
    const roomDetail = new RoomDetail();
    const player = new Player();
    player.name = this.getMyName();
    player.uniq_code = this.getMyUniqId();
    roomDetail.room_code = this.getRoomCode();
    this.socket.emit('createRoom', { room_detail: roomDetail, player: player});
  }

  tellServerJoinRoom() {
    const player = new Player();
    player.name = this.getMyName();
    player.uniq_code = this.getMyUniqId();
    this.socket.emit('joinRoom', { room_code: this.getRoomCode(), player: player});
  }

  receiveDetailRoom() {
    const observable = new Observable(observer => {
      this.socket.on('sendToClientRoom:' + this.getRoomCode(), (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
