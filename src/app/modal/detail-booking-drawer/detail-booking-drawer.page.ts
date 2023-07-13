import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-booking-drawer',
  templateUrl: './detail-booking-drawer.page.html',
  styleUrls: ['./detail-booking-drawer.page.scss'],
})
export class DetailBookingDrawerPage implements OnInit {

  id_booking:any;

  constructor(private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  getDataDetailBooing(id_booking){
    
  }

}
