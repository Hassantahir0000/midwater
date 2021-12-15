import { Injectable } from '@angular/core';
import { AppEventsService } from '../app-events/app-events.service';
import { AppHttpService } from '../app-http/app-http.service';
import { AppToastService } from '../app-toast/app-toast.service';
import { AppUserService } from '../app-user/app-user.service';
import { ConfigService } from '../config/config.service';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AppWishListService {
  public wishListArray = [];
  constructor(
    public loading: LoadingService,
    public appUserService: AppUserService,
    public appToastService: AppToastService,
    public appEventsService: AppEventsService,
    public config: ConfigService,
    public appHttpService: AppHttpService,) {
    this.registerEvents()
  }
  registerEvents() {
    let userLogin = this.appEventsService.subscribe("userLogin")
    userLogin.subscriptions.add(userLogin.event.subscribe(data => {
      this.getWishListProducts()
    }));

    let userLogout = this.appEventsService.subscribe("userLogout")
    userLogout.subscriptions.add(userLogout.event.subscribe(data => {
      this.wishListArray = []
    }));
  }
  addRemoveWishProduct(id) {
    if (this.appUserService.whoIsUser() != "customer") {
      this.appToastService.toastError("Please Login")
      return 0
    }

    if (this.productIsInList(id))
      this.removeFromWishlist(id)
    else
      this.addToWishlist(id)
  }
  addToWishlist(id) {
    this.addWishList(id)
  }
  removeFromWishlist(id) {
    this.removeWishList(id)
  }
  addWishList(productId) {
    let d: { [k: string]: any } = {};
    d.customer_id = this.appUserService.customerData.id;
    d.product_id = productId;
    console.log(d)
    this.appHttpService.postHttp('wishlist', d, true).then((data: any) => {
      this.appEventsService.publish('wishListUpdate', { id: productId, value: true });
      this.updateWishList(data)
      this.appToastService.toast("added to wishlist")
    });
  }

  removeWishList(id) {
    let wishListId = this.getWishListId(id)
    let data: { [k: string]: any } = {};
    data.customer_id = this.appUserService.customerData.id;
    data.product_id = id;
    this.appHttpService.deleteHttp('wishlist/' + wishListId, data, true).then((data: any) => {
      this.appEventsService.publish('wishListUpdate', { id: id, value: false });
      this.updateWishList(data)
      this.appToastService.toast("removed from wishlist")
    });
  }
  //============================================================================
  getWishListProducts(page = 1) {
    let url = "wishlist"
    url += "?limit=" + 9999
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    url += "&getDetail=1"
    url += "&page=" + page
    //getting all allCategories
    this.appHttpService.getHttp(url).then((data: any) => {
      let resoponse = data
      //if (resoponse < 100) this.getWishListProducts(page++)
      if (resoponse.length != 0) {
        this.updateWishList(resoponse)
      }
    });
  }
  getWishListId(id) {
    let found = 0;
    this.wishListArray.forEach(element => {
      if (element.product_id == id)
        found = element.wishlist
    });
    return found
  }
  updateWishList(resoponse) {
    // for (let value of resoponse)
    //  this.wishListArray.push(value)
    this.wishListArray = resoponse
  }
  productIsInList(id) {
    let found = false;
    this.wishListArray.forEach(element => {
      if (element.product_id == id)
        found = true
    });
    return found
  }
}
