import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CreaterRoomComponent } from './components/creater-room/creater-room.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create-room', component: CreaterRoomComponent },
  { path: 'join-room', component: JoinRoomComponent },
  // { path: 'waiting-room/:friend_name/:room_code/:time', component: WaitingRoomComponent },
  { path: 'waiting-room/:roomCode', component: WaitingRoomComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreaterRoomComponent,
    WaitingRoomComponent,
    JoinRoomComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
