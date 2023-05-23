import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toast: ToastController,
              private alert: AlertController) { }


  async showToast(msg, color){
    const toast = await this.toast.create({
      message: msg,
      duration: 5000,
      color: color
    })
    toast.present();
  }


}
