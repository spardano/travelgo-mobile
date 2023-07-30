import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-verify-notification',
  templateUrl: './verify-notification.page.html',
  styleUrls: ['./verify-notification.page.scss'],
})
export class VerifyNotificationPage implements OnInit {

  email:string;
  options: AnimationOptions;
  constructor(private r: ActivatedRoute,
              private auth: AuthenticationService,
              private helper: HelperService) { }

  ngOnInit() {
    this.email = this.r.snapshot.params['email'];
    var lottieJSON = 'assets/illustration/lottie/email-verification.json';
    this.options = {
      path: lottieJSON
    };
  }

  sendEmailVerification(){
    this.helper.alertEverythingModal('loading', 'Email Verifikasi', 'Sedang Mengirim...');
    this.auth.resendEmailVerification(this.email).subscribe();
  }

}
