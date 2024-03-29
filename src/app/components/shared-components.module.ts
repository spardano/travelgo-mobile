import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CardTicketComponent } from './card-ticket/card-ticket.component';
import { CardBookingComponent } from './card-booking/card-booking.component';
import { LogoComponent } from './logo/logo.component';
import { BtnGoogleComponent } from './btn-google/btn-google.component';
import { NoDataComponent } from './no-data/no-data.component';


@NgModule({
  declarations: [
    ShowHidePasswordComponent,
    CardTicketComponent,
    CardBookingComponent,
    LogoComponent,
    BtnGoogleComponent,
    NoDataComponent
              ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule
  ],
  exports: [
    ShowHidePasswordComponent,
    CardTicketComponent,
    CardBookingComponent,
    LogoComponent,
    BtnGoogleComponent,
    NoDataComponent
          ]
})
export class SharedComponentsModule { }
