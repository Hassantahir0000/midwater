import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style24',
  templateUrl: './product-card-style24.component.html',
  styleUrls: ['./product-card-style24.component.scss'],
})
export class ProductCardStyle24Component implements OnInit {

  @Input('data') data;//product data
  @Input('wishListStatus') wishListStatus;//product data
  @Input('outOfStock') outOfStock;//product data

  @Output() onClickProduct = new EventEmitter();
  @Output() onClickWishIcon = new EventEmitter();
  @Output() onClickQuantityPlus = new EventEmitter();
  @Output() onClickQuantityMinus = new EventEmitter();

  quantityNumber = 0
  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController,
    public appCartService: AppCartService,
  ) {

  }
  getQuantity() {
    return this.appCartService.getProductQuantity(this.data.product_id)
  }
  clickWishIcon() {
    this.onClickWishIcon.emit()
  }
  getHeartColor() {
    if (this.wishListStatus)
      return 'danger'
    else
      return 'medium'
  }

  quantityMinus() {
    this.onClickQuantityMinus.emit()
  }
  quantityPlus() {
    this.onClickQuantityPlus.emit()
  }
  openProductPage() {
    this.onClickProduct.emit();
  }
  getStarIconName(val) {
    // let value = parseFloat(val).toFixed(2)
    // let productRating = this.data.product_rating
    // if (productRating == null)
    return "star"

    // if (parseFloat(productRating) >= parseFloat(value))
    //  return "star"

    // if (parseFloat(this.data.product_rating) < parseFloat(value) && parseFloat(this.data.product_rating + 1) >)
    //   return "star-half"

  }
  getStarIconColor(val) {

    let value = parseFloat(val).toFixed(2)
    let productRating = this.data.product_rating
    if (productRating == null)
      return "medium"

    if (parseFloat(productRating) >= parseFloat(value))
      return "warning"
    else
      return "medium"
  }
  ngOnInit() { }

}

