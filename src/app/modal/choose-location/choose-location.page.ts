import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.page.html',
  styleUrls: ['./choose-location.page.scss'],
})
export class ChooseLocationPage implements OnInit {

  type:any="penjemputan";

  //variable
  title;
  map:Map;
  newMarker:any;
  address:string[];

  constructor(private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    this.checkTypeTitle();
  }

  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
    this.locatePosition();
  }

  loadMap(){
    this.map = new Map("map").setView([17.3850,78.4867], 20);
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
    
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {

      if(this.newMarker){
        this.newMarker.clearLayers();
      }

      this.newMarker = marker([e.latitude,e.longitude], {draggable: 
        true})
      this.newMarker.addTo(this.map);

      this.newMarker.bindPopup("Lokasi kamu sekarang!").openPopup();
     
      this.getAddress(e.latitude, e.longitude); // This line is added
   
      this.newMarker.on("dragend", ()=> {
        const position = this.newMarker.getLatLng();
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
      this.address = Object.values(results[0]).reverse();
      console.log(this.address);
    });
  }

}
