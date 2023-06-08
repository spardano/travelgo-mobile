import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, from } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { environment } from 'src/environments/environment';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.page.html',
  styleUrls: ['./payment-gateway.page.scss'],
})
export class PaymentGatewayPage implements OnInit {

  duePaymentData:any;
  externalLink:any;
  options: AnimationOptions;
  

  constructor(private paymentService: PaymentGatewayService,
              private snap: ActivatedRoute,
              private sanitize: DomSanitizer,
              private helper: HelperService) { }

  ngOnInit() {
    var lottieJSON = 'assets/illustration/lottie/online-payment.json';
    this.options = {
      path: lottieJSON
    };
    delay(300);
    this.getduePayment();
  }

  getduePayment(){
    
    const id_order = this.snap.snapshot.paramMap.get('id');
    this.duePaymentData = {
      id: id_order,
      total_bayar: 260000,
    }

    this.getRedirectSnapMidtrans();
    
  }

  getRedirectSnapMidtrans(){
    from(this.paymentService.requestTransaction(this.duePaymentData)).subscribe(res=>{
      // this.transformUrl(res['redirect_url'])
      this.helper.openWithCordovaBrowser(res['redirect_url']);
    })
  }

  transformUrl(link){
    this.externalLink = this.sanitize.bypassSecurityTrustResourceUrl(link);
  }

  resendMidtransRequest(){
    this.getduePayment();
  }

}
