import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { StartgameComponent } from './components/startgame/startgame.component';
import { MainComponent } from './components/main/main.component';
import { PlayroomComponent } from './components/playroom/playroom.component';
import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'startgame', component: StartgameComponent },
  { path: 'playroom/:memberName/:room_code/:timePerRound', component: PlayroomComponent}
];

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StartgameComponent,
    PlayroomComponent
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
