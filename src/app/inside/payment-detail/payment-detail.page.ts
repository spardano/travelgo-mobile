import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { from } from 'rxjs';
import { PemesananService } from 'src/app/services/pemesanan.service';
import { Preferences } from '@capacitor/preferences';
import { HelperService } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  data_booking:any = [];
  area_jemput:any={};
  area_antar:any={};
  totalTicket = 0;
  feeTambahan = 0;
  tk_biaya;
  ppn = 0;
  biayaAdmin = 6500;
  totalTagihan = 0;
  isAlertOnSpot:boolean = false;
  paymentMethod = 'online';

  constructor(private alert: AlertController,
              private router: Router,
              private storage: DataStorageService,
              private pemesanan: PemesananService,
              private helper: HelperService) { }

  ngOnInit() {
    this.getDataBooking();
  }

  getDataBooking(){
    this.storage.getData('data-booking').then(res=>{
      let data = JSON.parse(res)
      console.log(data);
      
      this.data_booking = data.selected_seat;
      this.area_jemput = data.area_jemput ? data.area_jemput : null;
      this.area_antar = data.area_antar ? data.area_antar : null;
      this.tk_biaya = this.data_booking.length * (parseFloat(this.area_antar.data.tk_biaya) + parseFloat(this.area_jemput.data.tk_biaya))
      // this.tk_biaya = 0;
      this.calculateTotalTicket();
      this.hitungTotal();
    })
  }

  calculateTotalTicket(){
    this.totalTicket = 0;
    this.data_booking.forEach(item => {
      this.totalTicket = this.totalTicket + item.tiket.harga_tiket; 
    });
  }

  closePage(){
    let alert = this.alert.create({
      message: "Apakah anda yakin ingin keluar dan membatalkan pembelian tiket ?",
      header: "Peringatan",
      buttons: [{
        text: 'OK',
        handler: () => {
          //hapus storage
          if(this.removeStorage()){
            this.router.navigate(['tabs/homepage'], {replaceUrl:true})
          }
        }
      }, {
        text: 'Batal',
        handler:() => {
          this.alert.dismiss();
        }
      }],
  
    });
    alert.then(alert => alert.present());
  }

  removeStorage(){
    this.storage.removeData('data-booking');
    return true;
  }

  hapusTiket(id){

    let alert = this.alert.create({
      message: "Apakah anda yakin ingin membatalkan tiket ini ?",
      header: "Komfirmasi",
      buttons: [{
        text: 'YA',
        handler: () => {
        
          this.data_booking.forEach((element, index) => {
            if(element.id == id){
              this.data_booking.splice(index, 1);
            } 
          });

          if(this.data_booking.length == 0){
            this.alert.dismiss();
            if(this.removeStorage()){
              this.router.navigate(['tabs/homepage'], {replaceUrl: true})
            }
          }else{
            this.storage.setData('data-booking', JSON.stringify(this.data_booking));
            this.refreshDataBooking();
            this.alert.dismiss();
          }

        }
      }, {
        text: 'TIDAK',
        handler:() => {
          this.alert.dismiss();
        }
      }],
  
    });
    alert.then(alert => alert.present());

  }

  hitungPPN(){
    let totalHarga = (this.totalTicket + this.feeTambahan)
    this.ppn = totalHarga * (10/100);
  }

  hitungTotal(){
    this.totalTagihan = this.totalTicket + this.feeTambahan + this.biayaAdmin + this.tk_biaya;
  }

  refreshDataBooking(){
    this.getDataBooking();
  }

  handleChange(e){
    console.log(e.detail.value);
    if(e.detail.value === 'onspot'){
      this.isAlertOnSpot = true;
      this.biayaAdmin = 0;
      this.hitungTotal();
    }else{
      this.isAlertOnSpot = false;
      this.biayaAdmin = 6500;
      this.hitungTotal();
    }
  }

  checkOut(){
    
    //simpan detail order dengan api
    from(this.pemesanan.storeBooking(this.totalTagihan)).subscribe(res=>{
      if(res['status']){
         //setelah berhasil disimpan direct ke pembayaran
          if(this.paymentMethod == 'online'){

            //hapus storeage detail-booking
            Preferences.remove({key:'data-booking'});

            //direct ke payment gateway
            const paymentUrl = `${environment.base_url}/payment/`
            this.helper.openWithCordovaBrowser(paymentUrl+res['payment_number'], true);

          }else{
              //lansung ke page notifikasi pemberitahuan berhasil membeli tiket
          }
      }
    });
  }
}
