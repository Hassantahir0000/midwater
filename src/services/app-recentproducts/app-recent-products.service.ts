import { Injectable } from '@angular/core';
import { AppEventsService } from '../app-events/app-events.service';
import { AppHttpService } from '../app-http/app-http.service';
import { AppUserService } from '../app-user/app-user.service';
import { ConfigService } from '../config/config.service';
import { AppStorageService } from '../app-storage/app-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AppRecentProductsService {

  public recentViewedProducts = new Array();

  constructor(
    public storage: AppStorageService,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public appEventsService: AppEventsService,
    public appUserService: AppUserService) {
    this.initializeRecentProducts();
  }

  initializeRecentProducts() {
    //getting recent viewed items from local storage
    this.storage.get('recentViewedProducts').then((val) => {
      if (val != null) this.recentViewedProducts = val;
    });
  }
  getRecentProducts() {
    let data: { [k: string]: any } = {};
    if (this.appUserService.customerData.customers_id != null)
      data.customers_id = this.appUserService.customerData.customers_id;
    data.language_id = this.config.languageIdNumber;
    data.currency_code = this.config.currencyCodeString;
    let arr = [];

    this.recentViewedProducts.forEach(element => {
      arr.push(element.products_id);
    });

    data.multiple_products_id = arr;
    this.recentViewedProducts = [];
    this.appHttpService.postHttp('getallproducts', data).then((data: any) => {
      if (data.success == 1) {
        this.recentViewedProducts = data.product_data;
      }
    });
  }
  //adding into recent array products
  addToRecent(p) {
    let found = false;
    for (let value of this.recentViewedProducts) {
      if (value.products_id == p.products_id) { found = true; }
    }
    if (found == false) {
      this.recentViewedProducts.push(p);
      this.storage.set('recentViewedProducts', this.recentViewedProducts);
    }
  }
  //removing from recent array products
  removeRecent(p) {
    this.recentViewedProducts.forEach((value, index) => {
      if (value.products_id == p.products_id) {
        this.recentViewedProducts.splice(index, 1);
        this.storage.set('recentViewedProducts', this.recentViewedProducts);
      }
    });
    this.appEventsService.publish('recentDeleted', "");
  }

  emptyRecentViewed() {
    this.recentViewedProducts = [];
    this.storage.set('recentViewedProducts', this.recentViewedProducts);
  }
}
