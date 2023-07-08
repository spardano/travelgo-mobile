import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.page.html',
  styleUrls: ['./payment-complete.page.scss'],
})
export class PaymentCompletePage implements OnInit {

  options: AnimationOptions;
  constructor(private router: Router) { }

  ngOnInit() {
    var lottieJSON = 'assets/illustration/lottie/compelete-payment.json';
    this.options = {
      path: lottieJSON
    };
  }

  directToHome(){
    this.router.navigate(['/tabs/homepage'], {replaceUrl: true});
  }

}
