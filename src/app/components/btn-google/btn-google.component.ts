import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-btn-google',
  templateUrl: './btn-google.component.html',
  styleUrls: ['./btn-google.component.scss'],
})
export class BtnGoogleComponent  implements OnInit {

  constructor(private google: GooglePlus,
              private helper: HelperService,
              private auth: AuthenticationService) { }

  ngOnInit() {}

  fireLoginViaGoogle(){
    this.google.login({
      webClientId: '316798190783-8oruqttcfbso076n71v7vpq7urq9nmfb.apps.googleusercontent.com',
      offLine: true
    }).then((res : any) => {
      
      let googleObject = {
        name: res.displayName,
        email: res.email,
        user_id: res.userId
      }

      
      this.auth.loginViaGoogle(googleObject).subscribe();

    }).catch(err => {
      this.auth.disconnectFromGoogle();
      this.helper.dismissLoadingModal();
      this.helper.alertEverythingModal('failed', 'Kesalahan', 'Maaf, Terjadi kesalahan pada login google, silah diulangi kembali', 'ok');
      console.log('error',err);
    });

  }

}
