import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        loadChildren: () => import('../homepage/homepage.module').then( m => m.HomepagePageModule),
        canLoad: [AuthenticationGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('../order/order.module').then( m => m.OrderPageModule),
        canLoad: [AuthenticationGuard]
      },
      {
        path: 'akun',
        loadChildren: () => import('../akun/akun.module').then( m => m.AkunPageModule),
        canLoad: [AuthenticationGuard]
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
