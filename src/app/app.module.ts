import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(){
  return player
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, LottieModule.forRoot({player:playerFactory}),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Storage, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
