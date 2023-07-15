import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY, USER_LOGIN_KEY } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient,
              private helper: HelperService) { }

  async get_bank(){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    return this.http.post(`${environment.base_api}/pemesanan/get-bank`,{}, httpOptions).pipe(
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

  async storFormRefund(FormDataRefund, id_booking) {

    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    const data = await Preferences.get({key: USER_LOGIN_KEY});
    const user = JSON.parse(data.value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'datarefund': FormDataRefund, 
      'id_booking' : id_booking
    };

    return this.http.post(`${environment.base_api}/pemesanan/refund`, body, httpOptions).pipe(
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
