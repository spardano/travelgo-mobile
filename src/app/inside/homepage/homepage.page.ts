import { Component, OnInit } from '@angular/core';
import { JadwalService } from 'src/app/services/jadwal.service';
import { delay, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { USER_LOGIN_KEY } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
 user:any = {};
 data_jadwal:any;
 data_area:any;
  //data dari api
//   data_jadwal:any = [{
//     id: 1,
//     perusahaan: 'PT. JASA MULYA TRAVEL',
//     angkutan: 'Innova',
//     harga: '300000',
//     trayek: 'Pekanbaru - Bukittinggi',
//     thumbnail: '../../../assets/illustration/car-ex.png'
//   },
//   {
//     id: 2,
//     perusahaan: 'PT. HUHU TRAVEL',
//     angkutan: 'Innova',
//     harga: '300000',
//     trayek: 'Pekanbaru - Bukittinggi',
//     thumbnail: '../../../assets/illustration/car-ex.png'
//   },
//   {
//     id: 3,
//     perusahaan: 'PT. HAHA TRAVEL',
//     angkutan: 'Avansa',
//     harga: '300000',
//     trayek: 'Pekanbaru - Bukittinggi',
//     thumbnail: '../../../assets/illustration/car-ex.png'
//   }
// ]

  constructor(private jadwal: JadwalService) { }

  ngOnInit() {
    this.getDataJadwal();
    this.getUser();
    this.getDataArea();
  }

  async getUser(){
    const res = await Preferences.get({key:USER_LOGIN_KEY})
    this.user = JSON.parse(res.value);
    console.log(this.user);
  }

  getDataJadwal(){
    from(this.jadwal.getDataJadwalApi()).subscribe(res =>{
      if(res['status']){
        this.data_jadwal = res['data'];
        console.log(this.data_jadwal);
        
      }
    })
  }

  getDataArea(){
    this.jadwal.getKabKotaArea().subscribe(res=>{
      this.data_area = res['data'];
    });
  }

}
