import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentGatewayPageRoutingModule } from './payment-gateway-routing.module';

import { PaymentGatewayPage } from './payment-gateway.page';
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
    PaymentGatewayPageRoutingModule,
    LottieModule.forRoot({player:playerFactory}),
  ],
  declarations: [PaymentGatewayPage]
})
export class PaymentGatewayPageModule {}
