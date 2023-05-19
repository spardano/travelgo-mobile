import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailJadwalDrawerPageRoutingModule } from './detail-jadwal-drawer-routing.module';

import { DetailJadwalDrawerPage } from './detail-jadwal-drawer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailJadwalDrawerPageRoutingModule
  ],
  declarations: [DetailJadwalDrawerPage]
})
export class DetailJadwalDrawerPageModule {}
