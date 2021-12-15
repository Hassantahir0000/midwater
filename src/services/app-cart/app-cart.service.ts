import { Injectable } from '@angular/core';
import { AppHttpService } from '../app-http/app-http.service';
import { AppStorageService } from '../app-storage/app-storage.service';
import { AppUserService } from '../app-user/app-user.service';
import { ConfigService } from '../config/config.service';
import { SharedDataService } from '../shared-data/shared-data.service';
import { Capacitor } from '@capacitor/core';
import { AppToastService } from '../app-toast/app-toast.service';
import { NavController } from '@ionic/angular';
import { CouponService } from '../coupon/coupon.service';
import { AppEventsService } from '../app-events/app-events.service';
import { Haptics } from '@capacitor/haptics';
@Injectable({
  providedIn: 'root'
})

export class AppCartService {
  public cartProductsArray = new Array()
  public cartquantityNumber = 0.0
  public cartTaxFloat = 0.0
  public cartSubTotalFloat = 0.0
  public cartShippingFloat = 0.0
  public cartTotalFloat = 0.0
  public cartDiscountFloat = 0.0

  constructor(
    public storage: AppStorageService,
    public config: ConfigService,
    public shared: SharedDataService,
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public nav: NavController,
    public couponService: CouponService,
    public appEventsService: AppEventsService,
  ) {
    this.registerEvents()
    if (this.appUserService.userIsLogedIn()) this.getCartFromServer()
  }

  registerEvents() {
    let userLogin = this.appEventsService.subscribe("userLogin")
    userLogin.subscriptions.add(userLogin.event.subscribe(data => {
      this.getCartFromServer();
    }));

    let userLogout = this.appEventsService.subscribe("userLogout")
    userLogout.subscriptions.add(userLogout.event.subscribe(data => {
      this.emptyCart()
    }));
  }

  emptyCart() {
    this.cartProductsArray = []
    this.removeCoupon
    this.cartTotalItems()
  }

  openCartPage() {
    this.nav.navigateForward("cart")
  }
  getCartFromServer() {
    let url = ""
    if (this.appUserService.whoIsUser() == "customer") {
      url = "cart"
      url += "?language_id=" + this.config.languageIdNumber
      // url += "&currency=" + this.config.currencyIdNumber
    }
    else {
      url = "cart/guest/get"
      url += "?session_id=" + this.appUserService.getGuestSession()
      url += "&language_id=" + this.config.languageIdNumber
      // url += "&currency=" + this.config.currencyIdNumber
    }

    this.appHttpService.getHttp(url, false).then((data: any) => {
      this.cartProductsArray = data
      console.log("Cart Array is ",this.cartProductsArray);
      if (this.cartProductsArray.length == 0) this.removeCoupon()
      this.cartTotalItems();
    })
  }
  checkProductStock(id, type, combinationId = null, quantity) {

    let url = "available_qty"
    url += "?product_id=" + id
    if (combinationId != null) url += "&product_combination_id=" + combinationId
    url += "&product_type=" + type
    return new Promise(resolve => {
      this.appHttpService.getHttp(url, true).then((data: any) => {
        let stock = parseInt(data.remaining_stock)
        if (stock == 0) {
          resolve({ status: "outOfStock" })
        }
        else if (stock >= quantity) {
          resolve({ status: "canAddToCart" })
        }
        else if (stock < quantity) {
          resolve({ status: "quantityIsLimited", stock: stock })
        }
      })
    });
  }

  addToCart(id, quantity, combinationId = null) {
    debugger;
    let data: { [k: string]: any } = {};
    data.product_id = id
    data.qty = quantity
    if (combinationId != null)
      data.product_combination_id = combinationId
    if (this.appUserService.checkIfGuestSessionIsAvailable())
      data.session_id = this.appUserService.getGuestSession()

    let url = "cart/guest/store"
    if (this.appUserService.whoIsUser() == "customer") url = "cart"

    this.appHttpService.postHttp(url, data, true).then((data: any) => {
      this.appToastService.toastMiddle("Added to Cart!")
      if (Capacitor.isNativePlatform()) Haptics.vibrate();
      if (this.appUserService.whoIsUser() == "guest") this.appUserService.setGuestSession(data.session);
      this.getCartFromServer()
    })
  }

  deleteProductFromCart(id, combinationId = null) {
    let data: { [k: string]: any } = {};
    data.product_id = id.toString()
    if (combinationId != null)
      data.product_combination_id = combinationId
    if (this.appUserService.checkIfGuestSessionIsAvailable())
      data.session_id = this.appUserService.getGuestSession()

    let url = "cart/guest/delete"
    if (this.appUserService.whoIsUser() == "customer") url = "cart/delete"

    this.appHttpService.deleteHttp(url, data, true).then((data: any) => {
      this.appToastService.toastMiddle("Deleted From Cart!")
      if (Capacitor.isNativePlatform()) Haptics.vibrate();
      this.getCartFromServer()
    })
  }

  calculateFinalPrice() {
    debugger;
    this.cartTotalFloat = 0;
    //this.cartTaxFloat = 0
    this.cartSubTotalFloat = 0
    //this.cartShippingFloat = 0
    //this.cartDiscountFloat = 0
    let total = 0;
    this.cartProductsArray.forEach((value, index) => {
      let price = value.total
      //if (value.discount_price != null) price = value.discount_price
      total += price;
    });
    this.cartSubTotalFloat = total
    this.cartTotalFloat = total + this.cartTaxFloat + this.cartShippingFloat - this.cartDiscountFloat
  }


  //Function calcualte the total items of cart
  cartTotalItems() {
    let total = 0
    for (let value of this.cartProductsArray) {
      total += parseInt(value.qty);
    }

    this.cartquantityNumber = total;
    this.calculateFinalPrice()
    //console.log("updated", this.cartquantity);
    return total;
  };

  //============================================== coupon =================================
  public couponObject: any = null
  checkCouponAvalability(value) {
    let url = "coupon"
    url += "?coupon_code=" + value
    this.appHttpService.postHttp(url, {}, true).then((data: any) => {
      this.couponObject = data
      this.applyCoupon()
      this.calculateFinalPrice()
      this.appToastService.toastMiddle("Coupon Applied!")
    })
  }
  applyCoupon() {
    if (this.couponObject) {
      if (this.couponObject.type == "fixed") {
        this.cartDiscountFloat = this.couponObject.amount
      }
      if (this.couponObject.type == "percentage") {
        let discount = (this.cartSubTotalFloat / 100) * this.couponObject.amount
        this.cartDiscountFloat = discount
      }
    }
  }
  removeCoupon() {
    this.cartDiscountFloat = 0
    this.calculateFinalPrice()
  }
  getProductQuantity(id) {
    let quantity = 0;
    this.cartProductsArray.forEach(element => {
      if (element.product_id == id) {
        quantity = element.qty
      }
    });
    return quantity
  }
}
