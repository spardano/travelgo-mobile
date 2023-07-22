import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, from } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { environment } from 'src/environments/environment';
import { AnimationOptions } from 'ngx-lottie';
import * as snap from '../../../assets/js/snap.js';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.page.html',
  styleUrls: ['./payment-gateway.page.scss'],
})
export class PaymentGatewayPage implements OnInit {

  externalLink:any;
  options: AnimationOptions;

  constructor(private paymentService: PaymentGatewayService,
              private snap: ActivatedRoute,
              private helper: HelperService,
              private router: Router) { }

  ngOnInit() {
    var lottieJSON = 'assets/illustration/lottie/online-payment.json';
    this.options = {
      path: lottieJSON
    };
    delay(300);
  }

  getduePayment(){
    const payment_number = this.snap.snapshot.paramMap.get('id');
    const paymentUrl = `${environment.base_url}/payment/${payment_number}`
    this.helper.openWithCordovaBrowser(paymentUrl);
  }


  checkPaymentStatus(){
    const payment_number = this.snap.snapshot.paramMap.get('id');
    from(this.paymentService.checkPaymentStatus(payment_number)).subscribe(res => {
      if(res['status']){
        const data = res['data'];
        if(data.transaction_status === 'settlement'){
          this.router.navigate(['payment-complete'], {replaceUrl:true});
        }else{
          this.helper.showToast('Kami belum menerima pembayaran', 'danger');
        }
      }
    })
  }

  closePage(){
    this.router.navigate(['tabs/homepage'], {replaceUrl:true});
  }

}
