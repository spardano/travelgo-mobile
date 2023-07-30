import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  data:any;
  path:string;

  options: AnimationOptions;

  constructor(private modalCtrl: ModalController,
              private helper: HelperService,
              private navCtrl: NavController,) { }

  ngOnInit() {
    switch (this.data.type) {
      case 'loading':
        // this.path = '/assets/animation/loading-neutral.json';  
        this.path = '/assets/animation/scanning.json';  
        break;

      case 'scanning':
        this.path = '/assets/animation/scanning.json';  
        break;

      case 'success':
        this.path = '/assets/animation/success.json';
        break;

      case 'failed':
        this.path = '/assets/animation/failed.json';
        break;

      case 'warning':
        this.path = '/assets/animation/warning.json';
        break;

      case 'disconnected':
        this.path = '/assets/animation/disconnected.json';
        break;
  
      default:
        this.path = '/assets/animation/loading-neutral.json';  
        break;
    }

    this.options = {
      path: this.path,
    };
  }

  actionButton(action){

    switch (action) {
      case 'direct':
        this.navCtrl.navigateForward(this.data.route)
        break;
      case 'close-app':
        navigator['app'].exitApp();
        break;
      case 'ok':
        this.helper.dismissLoadingModal();
        break;
      default:
        this.helper.dismissLoadingModal();
        break;
    }

    this.modalCtrl.dismiss();
  }

}
