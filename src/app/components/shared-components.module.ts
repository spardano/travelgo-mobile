import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CardTicketComponent } from './card-ticket/card-ticket.component';


@NgModule({
  declarations: [
    ShowHidePasswordComponent,
    CardTicketComponent,
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
          ]
})
export class SharedComponentsModule { }
