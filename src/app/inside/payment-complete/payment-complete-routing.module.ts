import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentCompletePage } from './payment-complete.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentCompletePageRoutingModule {}
