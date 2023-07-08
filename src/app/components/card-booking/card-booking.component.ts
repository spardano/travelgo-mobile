import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss'],
})
export class CardBookingComponent  implements OnInit {

  @Input() data_booking: any;

  constructor() { }
  baya:any;
  ngOnInit() {}


}
