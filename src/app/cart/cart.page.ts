import { Component, OnInit, ApplicationRef } from '@angular/core';


import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { CouponService } from 'src/services/coupon/coupon.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppStorageService } from 'src/services/app-storage/app-storage.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  total: any;
  moreProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public config: ConfigService,
    public loading: LoadingService,
    private storage: AppStorageService,
    public appEventsService: AppEventsService,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public appHttpService: AppHttpService,
    public appCartService: AppCartService,
    public appUserService: AppUserService,
    public appLogService: AppLogService
  ) {
    this.getMoreProducts()
  }
  goBack() {
    this.navCtrl.back()
  }

  getMoreProducts() {
    let url = "products"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"

    this.appHttpService.getHttp(url).then((data: any) => {
      this.moreProductsArray = data
    })
  }
  removeCoupon() {
    this.appCartService.removeCoupon()
  }
  ngOnInit() {

  }

  public couponCodeString = ""
  applyCoupon() {
    this.appCartService.checkCouponAvalability(this.couponCodeString);
  }
  proceedToCheckOut() {
    this.navCtrl.navigateForward("/shipping-address");
  }

}
