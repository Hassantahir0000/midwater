import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, IonContent, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { CouponService } from 'src/services/coupon/coupon.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
//import { Stripe } from '@ionic-native/stripe/ngx';
//import { PaytmService } from 'src/services/paytm/paytm.service';
import { HTTP } from '@ionic-native/http/ngx';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppAlertService } from 'src/services/app-alert/app-alert.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { NgForm } from '@angular/forms';

declare var Instamojo: any;
declare var braintree;
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('stripeForm', { static: true }) stripeForm: NgForm;
  constructor(
    public navCtrl: NavController,
    public appCartService: AppCartService,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    public appToastService: AppToastService,
    public appOrderService: AppOrderService,
    public appUserService: AppUserService
  ) {

  }
  addToOrder() {
    if (this.appOrderService.orderDetails.payment_method == "paypal" || this.appOrderService.orderDetails.payment_method == "stripe") {
      if (!this.stripeForm.form.valid) {
        this.appToastService.toastError("invalid card data")
        return 0
      }
    }
    debugger;
    this.appOrderService.orderDetails.currency_id = this.config.currencyIdNumber
    if (this.appUserService.checkIfGuestSessionIsAvailable())
      this.appOrderService.orderDetails.session_id = this.appUserService.getGuestSession()

    this.appHttpService.postHttp('order', this.appOrderService.orderDetails, true).then((data: any) => {
      this.appToastService.toast("Order Placed");
      this.navCtrl.navigateRoot("thank-you")
    });
  }

  getShippingAddressData() {
    let selected = false
    return {
      text1: this.appOrderService.orderDetails.delivery_first_name + ' ' + this.appOrderService.orderDetails.delivery_last_name,
      text2: this.appOrderService.orderDetails.delivery_country_name,
      text3: this.appOrderService.orderDetails.delivery_street_aadress + " " + this.appOrderService.orderDetails.delivery_city + " " + this.appOrderService.orderDetails.delivery_postcode,
      selected: selected
    }
  }
  getBillingAddressData() {
    let selected = false
    return {
      text1: this.appOrderService.orderDetails.billing_first_name + ' ' + this.appOrderService.orderDetails.billing_last_name,
      text2: this.appOrderService.orderDetails.billing_country_name,
      text3: this.appOrderService.orderDetails.billing_street_aadress + " " + this.appOrderService.orderDetails.billing_city + " " + this.appOrderService.orderDetails.billing_postcode,
      selected: selected
    }
  }
  goBack() {
    this.navCtrl.back()
  }

  ngOnInit() {
    this.stripeFormChangeEvent()
  }
  stripeFormChangeEvent() {
    this.stripeForm.form.valueChanges.subscribe(x => {
      console.log(this.stripeForm.form.valid)
    })
  }
}
