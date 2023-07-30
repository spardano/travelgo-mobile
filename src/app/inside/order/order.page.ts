import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { ListbookingService } from 'src/app/services/listbooking.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  user:any = {};
  data_booking:any;

  constructor(private mybooking: ListbookingService,
              private helper: HelperService ) { }

  ngOnInit() {
    this.helper.alertEverythingModal('loading', 'Memuat', 'Sedang Memuat...');
    this.getMyBooking();
  }

  getMyBooking(){
    from(this.mybooking.getBooking()).subscribe(res =>{
      if(res['status']){
        this.data_booking = res['data'];
        console.log(this.data_booking);
        this.helper.dismissLoadingModal();
      }else{
        this.helper.dismissLoadingModal();
        this.data_booking = null;
      }
    })
  }

}
