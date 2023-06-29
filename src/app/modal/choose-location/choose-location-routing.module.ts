import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseLocationPage } from './choose-location.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseLocationPageRoutingModule {}
