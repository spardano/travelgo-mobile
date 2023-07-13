import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
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
              private iab: InAppBrowser,
              private router: Router,
              private loadingController: LoadingController ) { }


  async showToast(msg, color){
    const toast = await this.toast.create({
      message: msg,
      duration: 5000,
      color: color
    })
    toast.present();
  }


  public openWithCordovaBrowser(url : string, redirect = false){
    let target = "_self";
    var ref = this.iab.create(url,target,this.options);

    if(redirect){
      ref.on('exit').subscribe(data => {
        this.router.navigate(['/tabs/homepage'])
      });
    }
    
  }




  public openWithSystemBrowser(url : string){
      let target = "_system";
      this.iab.create(url,target,this.options);
  }

  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.iab.create(url,target,this.options);
  }


    // Simple loader
    simpleLoader() {
      this.loadingController.create({
          message: 'Loading...'
      }).then((response) => {
          response.present();
      });
    }
  
    // Dismiss loader
    dismissLoader() {
      this.loadingController.dismiss().then((response) => {
          console.log('Loader closed!', response);
      }).catch((err) => {
          console.log('Error occured : ', err);
      });
    }

      // Auto hide show loader
      autoLoader() {
        this.loadingController.create({
          message: 'Loader hides after 4 seconds',
          duration: 4000
        }).then((response) => {
          response.present();
          response.onDidDismiss().then((response) => {
            console.log('Loader dismissed', response);
          });
        });
      } 

      // Custom style + hide on tap loader
      customLoader() {
        this.loadingController.create({
          message: 'Loader with custom style',
          duration: 4000,
          cssClass:'loader-css-class',
          backdropDismiss:true
        }).then((res) => {
          res.present();
        });
      }


}
