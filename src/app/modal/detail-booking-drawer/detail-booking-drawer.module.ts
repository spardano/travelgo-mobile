import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBookingDrawerPageRoutingModule } from './detail-booking-drawer-routing.module';

import { DetailBookingDrawerPage } from './detail-booking-drawer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBookingDrawerPageRoutingModule
  ],
  declarations: [DetailBookingDrawerPage]
})
export class DetailBookingDrawerPageModule {}
