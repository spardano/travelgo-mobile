import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCompletePageRoutingModule } from './payment-complete-routing.module';

import { PaymentCompletePage } from './payment-complete.page';
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
    PaymentCompletePageRoutingModule,
    LottieModule.forRoot({player:playerFactory}),
  ],
  declarations: [PaymentCompletePage]
})
export class PaymentCompletePageModule {}
