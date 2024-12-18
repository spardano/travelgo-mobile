import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PemesananService {

  constructor(private http: HttpClient,
              private helper: HelperService) { }

  async storeBooking(total_harga, tk_biaya){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    const res_p = await Preferences.get({key: 'data-booking'});
    const detail_booking = JSON.parse(res_p.value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    }

    const body = {
      'detail_booking': detail_booking,
      'total_harga': total_harga,
      'tk_biaya': tk_biaya
    };

    return this.http.post(`${environment.base_api}/pemesanan/store-booking`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        this.helper.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).toPromise();
  } 
  
  async BookingCencel(id_booking){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = { 
      'id_booking' : id_booking
    };

    return this.http.post(`${environment.base_api}/pemesanan/cencel-booking`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        this.helper.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).toPromise();

  }
  
  async checkCoverLocation(lat, lng, id_jadwal, type){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      lat: lat,
      lng: lng,
      id_jadwal: id_jadwal,
      type: type
    }

    return this.http.post(`${environment.base_api}/pemesanan/geometry-checking`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e=>{
        this.helper.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).toPromise();

  }
}
