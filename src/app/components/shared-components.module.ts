import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CardTicketComponent } from './card-ticket/card-ticket.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  declarations: [
    ShowHidePasswordComponent,
    CardTicketComponent,
    LogoComponent
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
    LogoComponent
          ]
})
export class SharedComponentsModule { }
