import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  options : InAppBrowserOptions = {
    location : 'no',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'no',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Keluar', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    hideurlbar: 'yes',
    toolbarcolor: '#84171A',
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};

  constructor(private toast: ToastController,
              private alert: AlertController,
              private iab: InAppBrowser ) { }


  async showToast(msg, color){
    const toast = await this.toast.create({
      message: msg,
      duration: 5000,
      color: color
    })
    toast.present();
  }


  public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.iab.create(url,target,this.options);
  }

  public openWithSystemBrowser(url : string){
      let target = "_system";
      this.iab.create(url,target,this.options);
  }

  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.iab.create(url,target,this.options);
  }


}
