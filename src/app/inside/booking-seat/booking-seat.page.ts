import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { ChooseLocationPage } from 'src/app/modal/choose-location/choose-location.page';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HelperService } from 'src/app/services/helper.service';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.page.html',
  styleUrls: ['./booking-seat.page.scss'],
})
export class BookingSeatPage implements OnInit {

  public $jumlahPenumpang = 1;
  public seatLayout:any = {};
  maxColumnLayout;
  selectedSeat: any = [];
  area_jemput:any;
  area_antar:any;

  constructor(private helper: HelperService,
              private seat: SeatService,
              private router: Router,
              private storage: DataStorageService,
              private modalCtrl: ModalController,
              private r: ActivatedRoute) { }

  ngOnInit() {
    this.get_bangku();
  }

  get_bangku(){
    var id_jadwal = this.r.snapshot.params['id_jadwal'];
    from(this.seat.getBangku(id_jadwal)).subscribe(res=>{
      if(res['status']){
        this.seatLayout = res['data'];
        console.log(this.seatLayout);
        
        this.maxColumnLayout = 12 / this.seatLayout.jumlah_kolom;
      }
    });
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
    
    let body = {
      'selected_seat' : this.selectedSeat,
      'area_jemput' : this.area_jemput,
      'area_antar' : this.area_antar
    }

    let data_order = JSON.stringify(body);
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
    // if(!this.area_antar){
    //   this.helper.showToast("Pilih lokasi pengantaran terlebih dahulu", "danger")
    // }
    //cek apakah lokasi pengantaran sudah di setting
    // if(!this.area_jemput){
    //   this.helper.showToast("Pilih lokasi penjemputan terlebih dahulu", "danger")
    // }

    return true;
  }

  async openModalMap(type){
    var id_jadwal = this.r.snapshot.params['id_jadwal'];
    const modal = await this.modalCtrl.create({
      component: ChooseLocationPage,
      componentProps: {
        type: type,
        id_jadwal: id_jadwal
      }
    })

    modal.present();
    modal.onDidDismiss().then((data) => {
      if(data.data){
        if(data.data.type == 'penjemputan'){
          this.area_jemput = data.data.area;
          console.log(this.area_jemput);
          
        }else{
          this.area_antar = data.data.area;
          console.log(this.area_jemput);
          
        }
      }
    });
  }
}
