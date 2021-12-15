import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  currentViewString = "addresslist"// or add new address
  disableSaveButtonBool = true
  editAddressData = null
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public modalCtrl: ModalController,
    public config: ConfigService,
    public appEventsService: AppEventsService,
    public loading: LoadingService,
    public appOrderService: AppOrderService,
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,) {

  }
  onClickEditAddress(value) {
    console.log(value)
    this.editAddressData = value
    this.showAddNewAddressSecton()
  }
  cancelAddAddress() {
    this.currentViewString = "addresslist"
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
    if (this.editAddressData == null) { //if (!this.appOrderService.addressIsFilled() && this.appUserService.whoIsUser() == "customer")
      this.appOrderService.addUserAddressToServer(this.shippingAddressformData);
      this.appOrderService.setOrderShippingAddress(this.shippingAddressformData);
      this.appOrderService.setOrderBillingAddress(this.shippingAddressformData);
      this.cancelAddAddress()
    }
    else {
      this.updateAddressOnServer(this.shippingAddressformData)
    }
  }

  updateAddressOnServer(value) {

    let data: { [k: string]: any } = {}
    data = value
    data.first_name = value.delivery_first_name
    data.last_name = value.delivery_last_name
    data.city = value.delivery_city
    data.company = this.editAddressData.company
    data.country_id = value.delivery_country
    data.dob = this.editAddressData.dob
    data.gender = this.editAddressData.gender
    data.lattitude = this.editAddressData.lattitude
    data.longitude = this.editAddressData.longitude
    data.postcode = value.delivery_postcode
    data.state_id = value.delivery_state
    data.street_address = value.delivery_street_aadress
    data.suburb = value.delivery_city
    data.phone = value.delivery_phone
    data.latlong = "31.411861087325256, 73.10474523829687"
    //data.is_default = this.editAddressData.default_address.toString()
    data.language_id = this.config.languageIdNumber
    data.currency = this.config.currencyIdNumber
    this.appHttpService.putHttp('customer_address_book/' + this.editAddressData.id, data, true).then((data: any) => {
      this.appToastService.toast("updated")
      this.editAddressData = null
      this.cancelAddAddress()
    });
  }


  goBack() {
    this.navCtrl.back()
  }

  ngOnInit() {

  }
}
