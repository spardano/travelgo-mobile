import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailJadwalDrawerPage } from './detail-jadwal-drawer.page';

const routes: Routes = [
  {
    path: '',
    component: DetailJadwalDrawerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailJadwalDrawerPageRoutingModule {}
