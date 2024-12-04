import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';
import { catchError, delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

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
              private router: Router,
              private google: GooglePlus,) { }


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
        this.help.dismissLoadingModal();
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
    this.router.navigateByUrl('home-guest', {replaceUrl:true});
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
            this.help.dismissLoadingModal();

            if(res['status']){
              this.currentAccessToken = res['access_token'];
              this.isAuthenticated.next(true);
              this.getUserLogin(res['access_token']);
              this.help.showToast("Berhasil login, Selamat Datang!", 'success');
            }else{
              if(res['code'] == 'unverified'){
                this.router.navigate([`verify-notification/${credentials.email}`], {replaceUrl:true});
              }else{
                this.help.showToast(res['message'], 'danger');
              }
            }
          }),
          catchError(e => {
            this.help.dismissLoadingModal();
            console.log(e.message);
            throw new Error(e.message);
          })
        );
    }


   loginViaGoogle(googleData){

    this.help.alertEverythingModal('loading', 'Memuat', 'Tunggu Sebentar...', 'none');

    return this.http.post(`${this.url}/guest/login-via-google`, googleData)
      .pipe(
        tap(res=>{
          this.help.dismissLoadingModal();
          if(res['status']){
            this.currentAccessToken = res['access_token'];
            this.getUserLogin(this.currentAccessToken);
          }else{
            this.help.alertEverythingModal('failed', 'Gagal', 'Gagal login dengan google', 'ok');
          }
        }),
        catchError(e => {
          this.help.dismissLoadingModal();
          console.log(e.message);
          this.disconnectFromGoogle();
          throw new Error(e.message);
        })
      )
  }

  async disconnectFromGoogle() {
    try {
      await this.google.disconnect();
      console.log('Disconnected from Google');
      // TODO: Do something after disconnect
    } catch (err) {
      console.error(err);
    }
  }

       //getUserLogin
   getUserLogin(token){

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
        Authorization: `${token}`
      })
    }

    this.http.get(`${this.url}/user/getuser`, httpOptions).pipe(
      tap(res => {
        this.help.dismissLoadingModal();
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
        this.help.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).subscribe();

   }

   register(newUser){
    return this.http.post(`${this.url}/guest/register`, newUser).pipe(
      tap(res=>{
        this.help.dismissLoadingModal();
        if(res['status']){
           const user = res['data'];
           console.log(newUser);

           //if register success, do login so it can automatically direct to homepage
           const credentials_login = {
             email:newUser.email,
             password: newUser.password
           }

           this.login(credentials_login).subscribe(_ =>{
           });

           this.help.showToast(res['message'], 'success');

         }else{
          this.help.showToast(res['message'], 'danger');
        }
      }),
      catchError(e=>{
       this.help.dismissLoadingModal();
       console.log(e.message);
       throw new Error(e.message)
      })
    )
   }
   
   logout(){
    Preferences.clear();
    this.disconnectFromGoogle();
    this.router.navigate(['/home'], {replaceUrl:true});
   }

   async editnumber(nomebaru) {

    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'nomerbaru': nomebaru, 
    };

    return this.http.post(`${environment.base_api}/user/update-number`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.help.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        this.help.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).toPromise();

  }

  async passBaru(lama, baru){
    const res = await Preferences.get({key: ACCESS_TOKEN_KEY});
    const token = res.value;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    };

    const body = {
      'passlama': lama, 
      'passbaru': baru
    };

    return this.http.post(`${environment.base_api}/user/update-pass`, body, httpOptions).pipe(
      tap(res=>{
        if(!res['status']){
          this.help.showToast(res['message'], 'danger');
        }
      }),
      catchError(e =>{
        this.help.dismissLoadingModal();
        throw new Error(e.message);
      })
    ).toPromise();
  }


  resendEmailVerification(email){
    const body = {
      email:email
    }

    return this.http.post(`${environment.base_api}/guest/resend-email-verification`, body).pipe(
      tap(res=>{
        this.help.dismissLoadingModal();
        if(!res['status']){
          this.help.showToast(res['message'], 'danger');
        }else{
          this.help.showToast(res['message'], 'success');
        }
      }),
      catchError(e =>{
        this.help.dismissLoadingModal();
        throw new Error(e.message);
      })
    )
  }


}
