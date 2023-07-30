import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyNotificationPageRoutingModule } from './verify-notification-routing.module';

import { VerifyNotificationPage } from './verify-notification.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(){
  return player
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyNotificationPageRoutingModule,
    LottieModule.forRoot({player:playerFactory}),
  ],
  declarations: [VerifyNotificationPage]
})
export class VerifyNotificationPageModule {}
