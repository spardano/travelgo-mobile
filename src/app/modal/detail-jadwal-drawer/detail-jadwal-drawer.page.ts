import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-jadwal-drawer',
  templateUrl: './detail-jadwal-drawer.page.html',
  styleUrls: ['./detail-jadwal-drawer.page.scss'],
})
export class DetailJadwalDrawerPage implements OnInit {

  data_jadwal:any;

  constructor(private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
    console.log(this.data_jadwal);
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  directToSeat(){
    this.modalCtrl.dismiss();
    this.router.navigate(['booking-seat/'+this.data_jadwal.id_jadwal]);
  }
  
}
