import { Component, OnInit } from '@angular/core';

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
    detailBangku:[
      {
        id_angkutan:1,
        baris:1,
        kolom:1,
        kode_bangku: 'CC',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:1,
        kolom:2,
        kode_bangku: 'KONSOL',
        ketersediaan: 0,
      },
      {
        id_angkutan:1,
        baris:1,
        kolom:3,
        kode_bangku: 'SUPIR',
        ketersediaan: 0,
      },
      {
        id_angkutan:1,
        baris:2,
        kolom:1,
        kode_bangku: 'A1',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:2,
        kolom:2,
        kode_bangku: 'A2',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:2,
        kolom:3,
        kode_bangku: 'A3',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:3,
        kolom:1,
        kode_bangku: 'B1',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:3,
        kolom:2,
        kode_bangku: 'B2',
        ketersediaan: 1,
      },
      {
        id_angkutan:1,
        baris:3,
        kolom:3,
        kode_bangku: 'B3',
        ketersediaan: 0,
      }
    ]
  }

  maxColumnLayout;
  selectedSeat: any = [];

  constructor() { }

  ngOnInit() {
    this.maxColumnLayout = 12 / this.seatLayout.jumlah_kolom;
  }

  increament(){
    if(this.$jumlahPenumpang < 4){
      this.$jumlahPenumpang++;
    }
  }

  decreament(){
    if(this.$jumlahPenumpang > 0){
      this.$jumlahPenumpang--;
    }
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  selectedItem(item){
    
  }

}
