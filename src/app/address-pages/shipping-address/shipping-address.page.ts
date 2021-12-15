import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { NavController } from '@ionic/angular';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {

  currentViewString = "addresslist"// or add new address
  disableSaveButtonBool = true
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public appUserService: AppUserService,
    public appOrderService: AppOrderService,
  ) {
    if (this.appUserService.whoIsUser() == "guest") this.currentViewString = "addnewaddress"
  }
  showCancelButton() {
    if (this.appUserService.whoIsUser() == "customer") return true
  }
  showAddNewAddressSecton() {
    this.currentViewString = "addnewaddress"
  }
  public shippingAddressformData;

  getFormData(event) {
    this.disableSaveButtonBool = !event.valid
    this.shippingAddressformData = event.value
  }

  saveFormData() {
    //if (!this.appOrderService.addressIsFilled() && this.appUserService.whoIsUser() == "customer")
    this.appOrderService.addUserAddressToServer(this.shippingAddressformData);
    this.appOrderService.setOrderShippingAddress(this.shippingAddressformData);
    this.appOrderService.setOrderBillingAddress(this.shippingAddressformData);
    this.goToPaymentPage()
  }
  goToPaymentPage() {
    this.navCtrl.navigateForward("/payment")
  }

  cancelAddAddress() {
    this.currentViewString = "addresslist"
  }
  goBack() {
    this.navCtrl.back()
  }

  ngOnInit() {

  }

}
