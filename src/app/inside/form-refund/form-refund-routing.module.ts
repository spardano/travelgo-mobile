import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRefundPage } from './form-refund.page';

const routes: Routes = [
  {
    path: '',
    component: FormRefundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRefundPageRoutingModule {}
