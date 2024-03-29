import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentDetailPageRoutingModule } from './payment-detail-routing.module';
import { PaymentDetailPage } from './payment-detail.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [PaymentDetailPage]
})
export class PaymentDetailPageModule {}
