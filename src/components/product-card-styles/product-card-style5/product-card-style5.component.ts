import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style5',
  templateUrl: './product-card-style5.component.html',
  styleUrls: ['./product-card-style5.component.scss'],
})
export class ProductCardStyle5Component implements OnInit {

  @Input('data') data;//product data
  @Input('wishListStatus') wishListStatus;//product data


  @Output() onClickProduct = new EventEmitter();
  @Output() onClickWishIcon = new EventEmitter();

  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController
  ) {

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

