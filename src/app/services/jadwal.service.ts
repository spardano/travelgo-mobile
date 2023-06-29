import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class JadwalService {

  constructor(private http: HttpClient,
              private helper: HelperService) { }

  async getDataJadwalApi(FilterData = null) {

    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'filter': FilterData
    };

    return this.http.post(`${environment.base_api}/pemesanan/jadwal`, body, httpOptions).pipe(
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

  getKabKotaArea(){
    return this.http.get(`${environment.base_api}/guest/get-kabkota`).pipe(
      tap(res=>{
        if(!res['status']){
          this.helper.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        throw new Error();
      })
    )
  }
  
}
