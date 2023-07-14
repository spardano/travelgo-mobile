import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailJadwalDrawerPage } from 'src/app/modal/detail-jadwal-drawer/detail-jadwal-drawer.page';

@Component({
  selector: 'app-card-ticket',
  templateUrl: './card-ticket.component.html',
  styleUrls: ['./card-ticket.component.scss'],
})
export class CardTicketComponent  implements OnInit {

  @Input() data_tiket: any;

  constructor(private modalCtrl:ModalController) { 
    
  }

  ngOnInit() {}

  async openDetailJadwal(data){
    const modal = await this.modalCtrl.create({
      component: DetailJadwalDrawerPage,
      componentProps: {
        data_jadwal: data
      },
      cssClass: 'detail-booking-drawer'
    })

    modal.present();
  }

}
