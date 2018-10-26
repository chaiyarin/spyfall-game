import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { StartgameComponent } from './components/startgame/startgame.component';
import { MainComponent } from './components/main/main.component';
import { PlayroomComponent } from './components/playroom/playroom.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'startgame', component: StartgameComponent },
  { path: 'playroom/:memberName/:timePerRound', component: PlayroomComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StartgameComponent,
    PlayroomComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
