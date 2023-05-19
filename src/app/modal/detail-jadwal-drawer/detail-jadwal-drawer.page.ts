import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-jadwal-drawer',
  templateUrl: './detail-jadwal-drawer.page.html',
  styleUrls: ['./detail-jadwal-drawer.page.scss'],
})
export class DetailJadwalDrawerPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modal.dismiss();
  }

}
