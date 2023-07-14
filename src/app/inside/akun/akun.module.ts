import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AkunPageRoutingModule } from './akun-routing.module';

import { AkunPage } from './akun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AkunPageRoutingModule
  ],
  declarations: [AkunPage]
})
export class AkunPageModule {}
