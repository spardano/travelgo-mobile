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

    var map = this.map;
    var marker = this.newMarker;
    var markerIcon = this.markerIcon;

    const GeocoderControl = new Geocoder({
      defaultMarkGeocode: false,
      placeholder: "Temukan lokasi",
      // position:'center'
    }).on('markgeocode', function(e) {
      map.panTo(e.geocode.center);
      console.log(e.geocode.center);

      if(marker){
        map.removeLayer(marker);
      }
      
      marker = L.marker([e.geocode.center.lat,e.geocode.center.lng], {draggable: true, icon: markerIcon});

      //add marker to map
      marker.addTo(map);

      marker.bindPopup("Lokasi Pencarian").openPopup();

      marker.on("dragend", ()=> {
        const {lat , lng} = marker.getLatLng();
        console.log(lat +', '+lng);
      }).on('locationerror', function(e){
        console.log(e);
        alert("Location access denied.");
      });

    });

    GeocoderControl.addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
    
    this.newMarker = L.marker([latitude,longitude], {draggable: true, icon: this.markerIcon});

    //add marker to map
    this.newMarker.addTo(this.map);
      
    //add pop up
    this.newMarker.bindPopup("Lokasi kamu sekarang!").openPopup();

    this.helper.dismissLoader();

  }

  locatePosition(){
   

    this.map.locate({setView:true}).on("locationfound", (e: any)=> {

      if(this.newMarker){
        this.map.removeLayer(this.newMarker);
      }

      this.newMarker = L.marker([e.latitude,e.longitude], {draggable: 
        true, icon: this.markerIcon})
      
      //add marker to map
      this.newMarker.addTo(this.map);
      
      //add pop up
      this.newMarker.bindPopup("Lokasi kamu sekarang!").openPopup();

      this.newMarker.on("dragend", ()=> {
        const {lat , lng} = this.newMarker.getLatLng();
        if(this.plt.is('capacitor')){
          this.getAddress(lat, lng);
        }
        this.lat = lat;
        this.lng = lng;
        console.log(this.lat +', '+this.lng);
      }).on('locationerror', function(e){
        console.log(e);
        alert("Location access denied.");
      });

    });

   
    
  }




        // this.lat = e.latitude;
      // this.lng = e.longitude;
      // if(this.plt.is("capacitor")){
      //   this.getAddress(e.latitude, e.longitude); // This line is added
      // }

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
