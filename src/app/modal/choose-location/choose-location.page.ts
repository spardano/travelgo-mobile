import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { delay, from } from 'rxjs';
import { PemesananService } from 'src/app/services/pemesanan.service';
import { HelperService } from 'src/app/services/helper.service';
import { Geolocation } from '@capacitor/geolocation';

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
  map:L.Map;
  newMarker:any;
  address:any;
  lat:any;
  lng:any;
  isMobile = false;
  markerIcon = L.icon(
    {
      iconUrl:'assets/images/pin.svg',
      iconSize: [32, 32],
      shadowUrl: null
    }
  );

  constructor(private nativeGeocoder: NativeGeocoder,
              private plt: Platform,
              private pemesanan: PemesananService,
              private modalCtrl: ModalController,
              private helper: HelperService) { }

  ngOnInit() {

  }

  // The below function is added
  ionViewDidEnter(){
    this.helper.simpleLoader();
    this.checkTypeTitle();
    if(this.plt.is("capacitor")){
      this.isMobile = true;
    }

    this.getCurrentPosition();

  }

  checkTypeTitle(){
    if(this.type == 'penjemputan'){
      this.title = 'Lokasi Penjemputan'
    }else{
      this.title = 'Lokasi Pengantaran'
    }
  }


  async getCurrentPosition ()  {
    const coordinates = await Geolocation.getCurrentPosition();
    
    this.loadMap(coordinates.coords.latitude, coordinates.coords.longitude)
  };

  loadMap(latitude, longitude){

    this.map = new L.Map("map").setView([latitude, longitude], 18);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(this.map);

    const GeocoderControl = new Geocoder({
      defaultMarkGeocode: false,
      placeholder: "Temukan lokasi",
    }).on('markgeocode', (e) => {
      this.map.panTo(e.geocode.center);
      console.log(e.geocode.center);

      this.addMarker(e.geocode.center.lat, e.geocode.center.lng)
      
    });

    GeocoderControl.addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
    
    
    this.addMarker(latitude, longitude);

    this.helper.dismissLoader();

  }

  addMarker(lat, lng){

    this.lat = lat;
    this.lng = lng;
    console.log([lat, lng]);
    
    
    //get adress
    if(this.plt.is("capacitor")){
      this.getAddress(lat, lng);
    }

    if(this.newMarker){
      this.map.removeLayer(this.newMarker);
    }
    
    this.newMarker = L.marker([lat,lng], {draggable: true, icon: this.markerIcon});

    //add marker to map
    this.newMarker.addTo(this.map);

    this.newMarker.bindPopup("Lokasi Pencarian").openPopup();

    this.newMarker.on("dragend", ()=> {
      const {lat , lng} = this.newMarker.getLatLng();
      this.lat = lat;
      this.lng = lng;
      console.log([this.lat ,this.lng]);
      //get adress
    if(this.plt.is("capacitor")){
      this.getAddress(lat, lng);
    }

    }).on('locationerror', function(e){
      console.log(e);
      alert("Location access denied.");
    });

  }

  locatePosition(){
   
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {      

      this.addMarker(e.latitude, e.longitude);

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


  ngOnDestroy(){
    this.helper.dismissLoader();
  }

}
