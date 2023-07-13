import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, from } from 'rxjs';
import { RefundService } from 'src/app/services/refund.service';
import { Location } from '@angular/common'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-refund',
  templateUrl: './form-refund.page.html',
  styleUrls: ['./form-refund.page.scss'],
})
export class FormRefundPage implements OnInit {

  FormDataRefund : FormGroup
  bank:any;
  selectedBankCode: number;

  constructor(private r: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private myrefund: RefundService,
              private helper: HelperService,
              private loc: Location,
              private alertController: AlertController) { }

  ngOnInit() {
    this.getbank();
    this.FormDataRefund = this.fb.group({
      rekening: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      bank: ['', Validators.required],
      atas_nama:['', Validators.required],
      no_transaksi:['', Validators.required],
      alasan:['', Validators.required]
    })
  }

  getbank(){
    from(this.myrefund.get_bank()).subscribe(res=>{
      if(res['status']){
        this.bank = res['data'];
        console.log(this.bank);
      }
    })
  }

  async storRefund() {
    const accountNumber = this.FormDataRefund.get('rekening').value;
  
    const id_booking = this.r.snapshot.params['id'];
    console.log(id_booking);
  
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin ingin membatalkan bookingan?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ya',
          handler: () => {
            from(this.myrefund.storFormRefund({ ...this.FormDataRefund.value, rekening: accountNumber }, id_booking)).subscribe(res => {
              if (res['status']) {
                console.log(this.FormDataRefund);
                this.helper.showToast("Berhasil Mengajukan Pembatalan", "success");
                this.loc.back();
              } else {
                this.helper.showToast("Gagal Mengajukan Pembatalan", "danger");
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  onBankSelect(event: any) {
  const selectedBankName = event.detail.value;
  const selectedBankObject = this.bank.find(item => item.name === selectedBankName);
  this.selectedBankCode = selectedBankObject ? selectedBankObject.code.toString() : null;
}

}
