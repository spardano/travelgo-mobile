import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyNotificationPage } from './verify-notification.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyNotificationPageRoutingModule {}
