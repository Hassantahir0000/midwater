import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style8',
  templateUrl: './product-card-style8.component.html',
  styleUrls: ['./product-card-style8.component.scss'],
})
export class ProductCardStyle8Component implements OnInit {

  @Input('data') data;//product data
  @Input('discount') discount;//product data
  @Input('outOfStock') outOfStock;//product data

  @Output() onClickProduct = new EventEmitter();
  @Output() onClickAddToCart = new EventEmitter();

  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController
  ) {

  }

  openProductPage() {
    this.onClickProduct.emit()
  }
  addToCart() {
    this.onClickAddToCart.emit()
  }
  ngOnInit() { }

}
