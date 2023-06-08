import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tabs/homepage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'detail-jadwal-drawer',
    loadChildren: () => import('./modal/detail-jadwal-drawer/detail-jadwal-drawer.module').then( m => m.DetailJadwalDrawerPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./inside/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'booking-seat',
    loadChildren: () => import('./inside/booking-seat/booking-seat.module').then( m => m.BookingSeatPageModule)
  },
  {
    path: 'payment-detail',
    loadChildren: () => import('./inside/payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'payment-gateway/:id',
    loadChildren: () => import('./inside/payment-gateway/payment-gateway.module').then( m => m.PaymentGatewayPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
