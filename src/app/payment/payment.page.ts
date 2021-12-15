import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public paymentMethodsArray = []
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public appOrderService: AppOrderService,
    public appHttpService: AppHttpService,
  ) { }
  selectPaymentMethod(value) {
    if (value == "paypal") this.appOrderService.orderDetails.payment_method = "paypal"
    if (value == "stripe") this.appOrderService.orderDetails.payment_method = "stripe"
    if (value == "banktransfer") this.appOrderService.orderDetails.payment_method = "banktransfer"
    if (value == "cash_on_delivery") this.appOrderService.orderDetails.payment_method = "cod"
    this.navCtrl.navigateForward("/order")
  }
  ngOnInit() {
    this.getPaymentMethods()
  }
  getPaymentMethods() {
    let url = "payment_method"
    url += "?language_id=" + this.config.languageIdNumber
    url += "&getDetail=1"
    url += "&currency=" + this.config.currencyIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.paymentMethodsArray = data
    })
  }
  goBack() {
    this.navCtrl.back()
  }

}
