import { Component, Input, OnInit } from '@angular/core';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.scss'],
})
export class ProductListCardComponent implements OnInit {

  @Input('page') page;//current page
  @Input('data') data;//current page
  constructor(
    public config: ConfigService,
    public appCartService: AppCartService
  ) { }

  deleteProductFromCart() {
    this.appCartService.deleteProductFromCart(this.data.product_id, this.data.product_combination_id);
  }
  ngOnInit() {
    console.log("ye hai",this.data)
  }

}
