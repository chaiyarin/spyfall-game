import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { StartgameComponent } from './components/startgame/startgame.component';
import { MainComponent } from './components/main/main.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'startgame', component: StartgameComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StartgameComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
