import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentGatewayPage } from './payment-gateway.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentGatewayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentGatewayPageRoutingModule {}
