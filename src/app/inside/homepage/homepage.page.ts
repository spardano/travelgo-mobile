import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  //data dari api
  data_tiket:any = {
    id: 1,
    perusahaan: 'PT. JASA MULYA TRAVEL',
    angkutan: 'Innova',
    harga: '300000',
    trayek: 'Pekanbaru - Bukittinggi',
    thumbnail: '../../../assets/illustration/car-ex.png'
  }

  constructor() { }

  ngOnInit() {
  }



}
