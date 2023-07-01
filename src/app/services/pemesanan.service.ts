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

  async storeBooking(total_harga){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    const res_p = await Preferences.get({key: 'data-booking'});
    const detail_booking = JSON.parse(res_p.value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'detail_booking': detail_booking,
      'total_harga': total_harga
    };

    return this.http.post(`${environment.base_api}/pemesanan/store-booking`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        throw new Error(e.message);
      })
    ).toPromise();
  }            
}
