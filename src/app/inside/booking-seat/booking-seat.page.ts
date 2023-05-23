import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.page.html',
  styleUrls: ['./booking-seat.page.scss'],
})
export class BookingSeatPage implements OnInit {

  public $jumlahPenumpang = 1;
  public seatLayout = {
    id:1,
    id_angkutan:1,
    jumlah_baris: 3,
    jumlah_kolom: 3,

    //data yang didapatkan dari api
    detailBangku:[
      {
        id:1,
        id_angkutan:1,
        baris:1,
        kolom:1,
        kode_bangku: 'CC',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:2,
        id_angkutan:1,
        baris:1,
        kolom:2,
        kode_bangku: 'KONSOL',
        ketersediaan: 0,
        harga_tiket: 200000
      },
      {
        id:3,
        id_angkutan:1,
        baris:1,
        kolom:3,
        kode_bangku: 'SUPIR',
        ketersediaan: 0,
        harga_tiket: 200000
      },
      {
        id:4,
        id_angkutan:1,
        baris:2,
        kolom:1,
        kode_bangku: 'A1',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:5,
        id_angkutan:1,
        baris:2,
        kolom:2,
        kode_bangku: 'A2',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:6,
        id_angkutan:1,
        baris:2,
        kolom:3,
        kode_bangku: 'A3',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:7,
        id_angkutan:1,
        baris:3,
        kolom:1,
        kode_bangku: 'B1',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:8,
        id_angkutan:1,
        baris:3,
        kolom:2,
        kode_bangku: 'B2',
        ketersediaan: 1,
        harga_tiket: 200000
      },
      {
        id:9,
        id_angkutan:1,
        baris:3,
        kolom:3,
        kode_bangku: 'B3',
        ketersediaan: 0,
        harga_tiket: 200000
      }
    ]
  }

  maxColumnLayout;
  selectedSeat: any = [];

  constructor(private helper: HelperService,
              private router: Router,
              private storage: DataStorageService) { }

  ngOnInit() {
    this.maxColumnLayout = 12 / this.seatLayout.jumlah_kolom;
  }

  increament(){
    if(this.$jumlahPenumpang < 4){
      this.$jumlahPenumpang++;
    }
  }

  decreament(){
    if(this.$jumlahPenumpang > 1){
      this.$jumlahPenumpang--;
    }
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  selectedItem(item){


    if(this.checkIfDataAlreadySelected(item.id)){
      this.removeSelectedSeat(item.id)
    }else{
      if(this.selectedSeat.length < this.$jumlahPenumpang){
        this.selectedSeat.push(item);
      }
    }
    
  }

  checkIfDataAlreadySelected(id){
    return this.selectedSeat.find(x => x.id == id);
  }

  removeSelectedSeat(id){
    return this.selectedSeat.forEach((element, index) => {
      if(element.id == id){
        this.selectedSeat.splice(index, 1);
      } 
    });
  }

  directToPembayaran(){
    //validasi
    if(this.validateBeforeSubmit() &&  this.simpanDataOrder()){
      //setelah submit pindah ke payment-detail
      this.router.navigate(['payment-detail']);
    }
   
  }

  simpanDataOrder(){
    let data_order = JSON.stringify(this.selectedSeat);
    this.storage.setData('data-booking', data_order);
    return true;
  }

  validateBeforeSubmit():boolean{
    //cek apakah jumlah penumpang dan jumlah bangku sama
    if(this.selectedSeat.length != this.$jumlahPenumpang){
      this.helper.showToast("Jumlah Penumpang dan bangku yang dipilih tidak singkron", "danger");
      return false;
    }

    //cek apakah lokasi penjemputan sudah di setting

    //cek apakah lokasi pengantaran sudah di setting

    return true;
  }

}
