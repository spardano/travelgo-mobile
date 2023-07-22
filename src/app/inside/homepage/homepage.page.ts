import { Component, OnInit } from '@angular/core';
import { JadwalService } from 'src/app/services/jadwal.service';
import { delay, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { USER_LOGIN_KEY } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
 user:any = {};
 data_jadwal:any;
 data_area:any;
 FilterData: FormGroup;
 today = new Date().toJSON().split('T')[0];

  constructor(private jadwal: JadwalService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getDataJadwal();
    this.getUser();
    this.getDataArea();

    this.FilterData = this.fb.group({
      s_tgl_keberangkatan: [''],
      s_area_keberangkatan: [''],
      s_area_tujuan:[''],
    });
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

  filterJadwal(){
    from(this.jadwal.getDataJadwalApi(this.FilterData.value)).subscribe(res =>{
      if(res['status']){
        this.data_jadwal = res['data'];
        console.log(this.data_jadwal);
      }
    })
  }

}
