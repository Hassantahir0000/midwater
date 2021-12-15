import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

import { LoadingService } from 'src/services/loading/loading.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  @ViewChild(IonRefresher, { static: false }) ionRefresher: IonRefresher;
  httpRunning = false;
  segmentsTabs = "pending";
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    public appUserService: AppUserService,
    public appCartService: AppCartService
  ) {
  }
  goBack() {
    this.navCtrl.back()
  }
  ordersArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  pageNumber = 1;

  pullRefresh() {
    this.pageNumber = 1
    this.ordersArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    this.getOrders()
  }
  getOrders() {
    let url = "customer/order"
    url += "?limit=" + this.config.perPageNumber
    url += "&orderDetail=1"
    url += "&productDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    url += "&page=" + this.pageNumber

    this.appHttpService.getHttp(url).then((data: any) => {
      console.log(data)
      let dat = data
      this.infinite.complete()
      if (this.pageNumber == 1) this.ordersArray = []
      if (dat.length != 0) for (let value of dat) this.ordersArray.push(value)
      if (dat.length < this.config.perPageNumber) this.infinite.disabled = true
      this.pageNumber++
      this.ionRefresher.complete()
    })
  }
  getOrderTotalPrice(o) {
    let priceFixed = parseFloat(o.order_price.toString()).toFixed(o.currency.decimal_place);
    return priceFixed + o.currency.code
  }

  getFilteredOrders() {
    debugger;
    if (this.ordersArray[0] == 1) return this.ordersArray
    if (this.segmentsTabs == 'pending') {
      let orders = []
      this.ordersArray.forEach(element => {
        if (element.order_status.toLocaleLowerCase() == "pending") orders.push(element)
      });
      return orders
    }
    if (this.segmentsTabs == 'delivered') {
      let orders = []
      debugger;
      this.ordersArray.forEach(element => {
        if (element.order_status.toLocaleLowerCase() == "complete") orders.push(element)
      });
      return orders
    }
    if (this.segmentsTabs == 'cancelled') {
      let orders = []
      this.ordersArray.forEach(element => {
        if (element.order_status.toLocaleLowerCase() == "cancelled") orders.push(element)
      });
      return orders
    }
  }
  ngOnInit() {
    this.getOrders();
  }

  showOrderDetail(order) {
    this.navCtrl.navigateForward("/my-order-detail/" + order.order_id);
  }
  openProductsPage() {
    this.navCtrl.navigateForward("tabs/home");
  }

}
