import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';
import { CreaterRoomComponent } from './components/creater-room/creater-room.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create-room', component: CreaterRoomComponent },
  { path: 'waiting-room/:friend_name/:room_code/:time', component: WaitingRoomComponent },
];

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreaterRoomComponent,
    WaitingRoomComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
