import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';
import { catchError, delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


export const ACCESS_TOKEN_KEY = 'auth-access-token';
export const USER_LOGIN_KEY = 'user-login-key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  subscriptions = new Subscription();

  //behaviour subject current user
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  //observable authentikasi status pengguna
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.base_api;


  constructor(private http: HttpClient,
              private help: HelperService,
              private router: Router) { }


   //cek token
   async checkToken(){
    const token = await Preferences.get({key: ACCESS_TOKEN_KEY});
    if(token.value) {
      this.isTokenExpired(token.value);
    } else {
      this.forceLogOutUser();
    }
  }

  async isTokenExpired(token){

    const body = {
      token: token
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'ngrok-skip-browser-warning': 'true',
      })
    }

    await this.http.post(`${this.url}/guest/checktoken`, body, httpOptions).pipe(
      tap(res=>{

        if(res['isExpired']){
          this.forceLogOutUser()
        }else {
          this.isAuthenticated.next(true);
          this.loadUser();
        }
      }),catchError(e =>{
        console.log('Error : '+e.message);
        throw new Error(e.message);
      })
    ).subscribe();

  }

  //keluarkan pengguna tanpa harus melalui api
  forceLogOutUser() {
    Preferences.remove({key:ACCESS_TOKEN_KEY});
    Preferences.remove({key:USER_LOGIN_KEY});
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('home-guest');
  }


      //load current user
  async loadUser() {

    let res = await Preferences.get({key:USER_LOGIN_KEY});

    if(res.value) {
      this.currentUser.next(JSON.parse(res.value))
    }else {
      this.currentUser.next(false);
    }

  }

    /**
   * login
   * @param  {} credentials
   */
    login(credentials) {
      return this.http.post(`${this.url}/guest/login`, credentials)
        .pipe(
          tap(res => {
            if(res['status']){
              this.currentAccessToken = res['access_token'];
              // this.getUserLogin(this.currentAccessToken);
              this.isAuthenticated.next(true);
              this.getUserLogin(res['access_token']);
              this.help.showToast("Berhasil login, Selamat Datang!", 'success');
            }else{
              this.help.showToast(res['message'], 'danger');
            }
          }),
          catchError(e => {
            console.log(e.message);
            throw new Error(e.message);
          })
        );
    }


       //getUserLogin
   getUserLogin(token){

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'ngrok-skip-browser-warning': 'true',
        Authorization: `${token}`
      })
    }

    this.http.get(`${this.url}/user/getuser`, httpOptions).pipe(
      tap(res => {
        if(res['status']){
            const user = res['data'];
            this.isAuthenticated.next(true);
            Preferences.set({key:ACCESS_TOKEN_KEY, value:token});
            this.currentUser.next(res['data']);
            Preferences.set({key: USER_LOGIN_KEY, value:JSON.stringify(res['data'])});
            this.router.navigateByUrl('/tabs/homepage', {replaceUrl: true});

        } else {
          this.help.showToast('Data tidak ditemukan', 'danger')
        }
      }),catchError(e=>{
        throw new Error(e.message);
      })
    ).subscribe();

   }

   register(newUser){
    return this.http.post(`${this.url}/guest/register`, newUser).pipe(
      tap(res=>{
        if(res['status']){
           const user = res['data'];
           console.log(newUser);

           //if register success, do login so it can automatically direct to homepage
           const credentials_login = {
             email:newUser.email,
             password: newUser.password
           }

           this.login(credentials_login).subscribe(_ =>{
            //  this.compService.dismissLoadingModal();
           });

           this.help.showToast(res['message'], 'success');

         }else{
          //  this.compService.dismissLoadingModal();
          //  this.compService.alertEverythingModal('failed', 'Kesalahan', res['message'], 'ok')
          this.help.showToast(res['message'], 'danger');
        }
      }),
      catchError(e=>{
      //  this.compService.dismissLoadingModal();
       console.log(e.message);
       throw new Error(e.message)
      })
    )
   }


}
