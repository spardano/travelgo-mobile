import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  url = environment.midtrans;

  constructor(private http: HttpClient,
              private helper: HelperService) { }

  async requestTransaction(payment_data){

    const username = environment.midtrans_server_key;

    const token = btoa(`${username}:`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      })
    };

    const payload = {
      transaction_details: {
        order_id: payment_data.id,
        gross_amount: payment_data.total_bayar,
      }
    }

    return this.http.post(this.url, payload, httpOptions).pipe(
      tap(res=>{
        console.log(res);
        if(!res['redirect_url']){
          this.helper.showToast('Request Transaksi pembayaran gagal dilakukan', 'danger');
        }
      }),catchError(e=>{
        throw Error(e.message);
      })
    ).toPromise();
  }
}
