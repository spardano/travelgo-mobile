import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AkunPageRoutingModule } from './akun-routing.module';

import { AkunPage } from './akun.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AkunPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [AkunPage]
})
export class AkunPageModule {}
