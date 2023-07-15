import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBookingDrawerPage } from './detail-booking-drawer.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBookingDrawerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBookingDrawerPageRoutingModule {}
