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

  constructor(private modal: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  closeModal(){
    this.modal.dismiss();
  }

  directToSeat(){
    this.modal.dismiss();
    this.router.navigate(['booking-seat']);
  }

}
