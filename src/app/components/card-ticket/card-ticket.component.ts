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

  constructor(private modal:ModalController) { 
    
  }

  ngOnInit() {}

  async openDetailJadwal(id){
    const modal = await this.modal.create({
      component: DetailJadwalDrawerPage,
      componentProps: {
        id: id
      },
      cssClass: 'detail-jadwal-drawer'
    })

    modal.present();
  }

}
