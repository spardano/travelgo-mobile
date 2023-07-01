import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http:HttpClient,
              private helper:HelperService) { }


  async getBangku(id_jadwal){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'id_jadwal' : id_jadwal,
    };

    return this.http.post(`${environment.base_api}/pemesanan/get-bangku`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['staus']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        throw new Error(e.message);
      })
    ).toPromise();
  }

}
