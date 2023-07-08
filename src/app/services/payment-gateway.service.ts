import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {


  constructor(private http: HttpClient,
              private helper: HelperService) { }

  async requestTransaction(id_booking){

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
    }

    return this.http.post(`${environment.base_api}/pemesanan/request-payment`, body, httpOptions).pipe(
      tap(res=>{
        console.log(res);
        if(!res['status']){
          this.helper.showToast('Request Transaksi pembayaran gagal dilakukan', 'danger');
        }
      }),catchError(e=>{
        throw Error(e.message);
      })
    ).toPromise();
  }

  async checkPaymentStatus(id_booking){
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
    }

    return this.http.post(`${environment.base_api}/pemesanan/check-payment`, body, httpOptions).pipe(
      tap(res=>{
        console.log(res);
        if(!res['status']){
          this.helper.showToast('Gagal memeriksa status pembayaran', 'danger');
        }
      }),catchError(e=>{
        throw Error(e.message);
      })
    ).toPromise();
  }
}
