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
    path: 'booking-seat/:id_jadwal',
    loadChildren: () => import('./inside/booking-seat/booking-seat.module').then( m => m.BookingSeatPageModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'payment-detail',
    loadChildren: () => import('./inside/payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'payment-gateway/:id',
    loadChildren: () => import('./inside/payment-gateway/payment-gateway.module').then( m => m.PaymentGatewayPageModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'choose-location',
    loadChildren: () => import('./modal/choose-location/choose-location.module').then( m => m.ChooseLocationPageModule)
  },
  {
    path: 'payment-complete',
    loadChildren: () => import('./inside/payment-complete/payment-complete.module').then( m => m.PaymentCompletePageModule)
  },
  {
    path: 'detail-booking-drawer',
    loadChildren: () => import('./modal/detail-booking-drawer/detail-booking-drawer.module').then( m => m.DetailBookingDrawerPageModule)
  },
  {
    path: 'form-refund/:id',
    loadChildren: () => import('./inside/form-refund/form-refund.module').then( m => m.FormRefundPageModule)
  },  {
    path: 'akun',
    loadChildren: () => import('./inside/akun/akun.module').then( m => m.AkunPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
