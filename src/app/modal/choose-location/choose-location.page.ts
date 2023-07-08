import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { PemesananService } from 'src/app/services/pemesanan.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.page.html',
  styleUrls: ['./choose-location.page.scss'],
})
export class ChooseLocationPage implements OnInit {

  type:any;
  id_jadwal:any;
  //variable
  title;
  map:Map;
  newMarker:any;
  address:any;
  lat:any;
  lng:any;
  isMobile = false;

  constructor(private nativeGeocoder: NativeGeocoder,
              private plt: Platform,
              private pemesanan: PemesananService,
              private modalCtrl: ModalController,
              private helper: HelperService) { }

  ngOnInit() {
    this.checkTypeTitle();
    if(this.plt.is("capacitor")){
      this.isMobile = true;
    }
  }

  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
    this.locatePosition();
  }

  loadMap(){
    this.map = new Map("map").setView([-0.30581329101178656,100.36843299865724], 20);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(this.map);;
  }

  checkTypeTitle(){
    if(this.type == 'penjemputan'){
      this.title = 'Lokasi Penjemputan'
    }else{
      this.title = 'Lokasi Pengantaran'
    }
  }

  locatePosition(){
    
    console.log('locate position');
    
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {

      this.newMarker = marker([e.latitude,e.longitude], {draggable: 
        true})

      this.newMarker.addTo(this.map);

      this.newMarker.bindPopup("Lokasi kamu sekarang!").openPopup();
     
      if(this.plt.is("capacitor")){
        this.getAddress(e.latitude, e.longitude); // This line is added
      }
      this.lat = e.latitude;
      this.lng = e.longitude;
   
      this.newMarker.on("dragend", ()=> {
        const {lat , lng} = this.newMarker.getLatLng();
        if(this.plt.is('android')){
          this.getAddress(lat, lng);
        }
        this.lat = lat;
        this.lng = lng;
        console.log(this.lat +', '+this.lng);
      });

    });
  }

  //The function below is added
  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = results[0];
      console.log(this.address);
    });
  }

  confirmLocation(){
    from(this.pemesanan.checkCoverLocation(this.lat, this.lng, this.id_jadwal, this.type)).subscribe(res=>{
      if(res['status']){
        console.log(res['data']);

        let area = {
          lat: this.lat,
          lng: this.lng,
          data: res['data']
        }

        this.modalCtrl.dismiss({
          type: this.type,
          area: area
        });
        
      }
    })
  }


}
