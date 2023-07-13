import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailBookingDrawerPage } from 'src/app/modal/detail-booking-drawer/detail-booking-drawer.page';
import { PemesananService } from 'src/app/services/pemesanan.service';
import { from } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { Location } from '@angular/common'
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss'],
})
export class CardBookingComponent  implements OnInit {

  @Input() data_booking: any;

  constructor(private modalCtrl:ModalController,
              private router: Router,
              private pemesanan: PemesananService,
              private helper: HelperService,
              private r: ActivatedRoute,
              private loc: Location,
              private loadingController: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {
    // console.log(this.data_booking)
  }

  async openDetailBooking(data){
    const modal = await this.modalCtrl.create({
      component: DetailBookingDrawerPage,
      componentProps: {
        id_booking: data.id
      },
      cssClass: 'detail-jadwal-drawer'
    })

    modal.present();
  }

  async cencelBooking(id_booking) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin ingin membatalkan bookingan?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ya',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Membatalkan Booking...',
              translucent: true,
            });
            await loading.present();
  
            from(this.pemesanan.BookingCencel(id_booking)).subscribe(
              (res) => {
                if (res['status']) {
                  console.log(id_booking);
                  this.helper.showToast('Cancel Booking Berhasil', 'success');
                  this.router.navigate(['/src/app/components/card-booking/card-booking.component.html']);
                  this.data_booking.status = 4;
                  loading.dismiss();
                  // Menutup animasi loading setelah proses selesai
                  // this.router.navigate(['/halaman-tujuan']); // Ganti '/halaman-tujuan' dengan URL halaman tujuan yang diinginkan
                } else {
                  this.helper.showToast('Gagal Cancel Booking', 'danger');
                  loading.dismiss(); // Menutup animasi loading jika terjadi kesalahan
                }
              },
              (error) => {
                console.error(error);
                loading.dismiss(); // Menutup animasi loading jika terjadi kesalahan
              }
            );
            
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  directToForm(){
    console.log(this.data_booking.id_booking);
    
    this.router.navigate(['form-refund/'+this.data_booking.id_booking]);
  }


}
