import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRefundPageRoutingModule } from './form-refund-routing.module';

import { FormRefundPage } from './form-refund.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormRefundPageRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [FormRefundPage]
})
export class FormRefundPageModule {}
