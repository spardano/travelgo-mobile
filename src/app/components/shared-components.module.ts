import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';


@NgModule({
  declarations: [
    ShowHidePasswordComponent
              ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule
  ],
  exports: [
    ShowHidePasswordComponent
          ]
})
export class SharedComponentsModule { }
