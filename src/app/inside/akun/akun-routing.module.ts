import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AkunPage } from './akun.page';

const routes: Routes = [
  {
    path: '',
    component: AkunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkunPageRoutingModule {}
