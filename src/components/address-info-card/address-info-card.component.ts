import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-info-card',
  templateUrl: './address-info-card.component.html',
  styleUrls: ['./address-info-card.component.scss'],
})
export class AddressInfoCardComponent implements OnInit {
  @Input('data') data //product 
  constructor() { }

  ngOnInit() { }

}
