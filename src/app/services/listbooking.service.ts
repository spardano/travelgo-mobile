import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Preferences } from '@capacitor/preferences';
import { ACCESS_TOKEN_KEY, USER_LOGIN_KEY } from './authentication.service';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListbookingService {

  constructor(private http:HttpClient,
              private helper:HelperService) { }

  async getBooking(){
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
      'id' : user.id,
    };

    return this.http.post(`${environment.base_api}/pemesanan/get-booking`, body, httpOptions).pipe(
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
