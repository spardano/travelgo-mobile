import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  data_booking:any = [];
  totalTicket = 0;
  feeTambahan = 0;
  ppn = 0;
  biayaAdmin = 6500;
  totalTagihan = 0;
  isAlertOnSpot:boolean = false;
  paymentMethod = 'online';

  constructor(private alert: AlertController,
              private router: Router,
              private storage: DataStorageService) { }

  ngOnInit() {
    this.getDataBooking();
  }

  getDataBooking(){
    this.storage.getData('data-booking').then(res=>{
      this.data_booking = JSON.parse(res);
      this.calculateTotalTicket();
      this.hitungTotal();
      // this.hitungPPN();
    })
  }

  calculateTotalTicket(){
    this.totalTicket = 0;
    this.data_booking.forEach(item => {
      this.totalTicket = this.totalTicket + item.harga_tiket; 
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
    this.totalTagihan = this.totalTicket + this.feeTambahan + this.biayaAdmin;
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

    //setelah berhasil disimpan direct ke pembayaran
    if(this.paymentMethod == 'online'){

        //direct ke payment gateway
        this.router.navigate(['payment-gateway/2'], {replaceUrl: true});

    }else{
        //lansung ke page notifikasi pemberitahuan berhasil membeli tiket
    }

  }

}
