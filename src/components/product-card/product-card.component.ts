import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppAnimationsService } from 'src/services/app-animations/app-animations.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @ViewChild('productRef', { static: false }) productRef: ElementRef

  @Input('data') data: any//product data
  public wishListFlagBool = false
  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController,
    public appWishListService: AppWishListService,
    public appEventsService: AppEventsService,
    public appCartService: AppCartService,
    public appToastService: AppToastService,
    public appAnimationsService: AppAnimationsService
  ) {
  }

  openProductPage() {
    this.shared.singleProductPageDataArray.push(this.data)
    this.navCtrl.navigateForward("/product-detail/" + this.data.product_id)
  }


  addRemoveWishProduct() {
    this.appWishListService.addRemoveWishProduct(this.data.product_id)
  }

  isInWishList() {
    this.wishListFlagBool = this.appWishListService.productIsInList(this.data.product_id)
    return this.wishListFlagBool
  }

  addToCart() {
    if (this.data.product_type == 'variable') {
      this.openProductPage()
    }
    else {
      this.checkingProductStock()
    }
  }

  quantityNumber: number = 1
  enableOutOFStockButtonBool = false
  quantityMinus() {
    if (this.quantityNumber > 1) {
      this.quantityNumber--
      this.checkingProductStock()
    }
  }
  quantityPlus() {
    this.quantityNumber++
    this.checkingProductStock()
  }

  checkingProductStock() {
    this.appCartService.checkProductStock(
      this.data.product_id,
      this.data.product_type,
      null,
      this.quantityNumber).then((data: any) => {
        if (data.status == "outOfStock") {
          this.enableOutOFStockButtonBool = true
        }
        else if (data.status == "canAddToCart") {
          this.appCartService.addToCart(this.data.product_id, this.quantityNumber, null)
        }
        else if (data.status == "quantityIsLimited") {
          this.appToastService.toastError("Quantity is Limited")
          this.quantityNumber = data.stock
        }
      });
  }

  productDiscount() {
    var rtn = ""
    var p1 = parseInt(this.data.product_price)
    var p2 = parseInt(this.data.product_discount_price)

    var result = Math.abs((p1 - p2) / p1 * 100)
    result = parseInt(result.toString())
    if (result == 0) { return false }
    rtn = '-' + result + '%'
    return rtn
  }
  ngOnInit() {
  }
}