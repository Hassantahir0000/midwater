import { Injectable } from '@angular/core';
import { AppHttpService } from '../app-http/app-http.service';
import { AppToastService } from '../app-toast/app-toast.service';
import { AppUserService } from '../app-user/app-user.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppOrderService {

  public orderDetails = {

    billing_first_name: "",
    billing_last_name: "",
    billing_street_aadress: "",
    billing_city: "",
    billing_postcode: "",
    billing_country: "",
    billing_country_name: "",
    billing_state: "",
    billing_state_name: "",
    billing_phone: "",

    delivery_first_name: "",
    delivery_last_name: "",
    delivery_street_aadress: "",
    delivery_city: "",
    delivery_postcode: "",
    delivery_country: "",
    delivery_state: "",
    delivery_country_name: "",
    delivery_state_name: "",
    delivery_phone: "",
    currency_id: 0,
    session_id: "",
    payment_id: 0,
    cc_cvc: "",
    cc_expiry_month: "12",
    cc_expiry_year: "2024",
    cc_number: "",
    payment_method: "cod",
    latlong: "31.411861087325256, 73.10474523829687"
  };

  constructor(
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public config: ConfigService,
    public appToastService: AppToastService
  ) {

  }

  addressIsFilled() {
    if (this.orderDetails.delivery_first_name == "") return false
    else return true
  }
  setOrderShippingAddress(data) {
    this.orderDetails.delivery_first_name = data.delivery_first_name
    this.orderDetails.delivery_last_name = data.delivery_last_name
    this.orderDetails.delivery_street_aadress = data.delivery_street_aadress
    this.orderDetails.delivery_city = data.delivery_city
    this.orderDetails.delivery_postcode = data.delivery_postcode
    this.orderDetails.delivery_country = data.delivery_country
    this.orderDetails.delivery_state = data.delivery_state
    this.orderDetails.delivery_country_name = data.delivery_country_name
    this.orderDetails.delivery_state_name = data.delivery_state_name
    this.orderDetails.delivery_phone = data.delivery_phone
  }
  setOrderBillingAddress(data) {
    this.orderDetails.billing_first_name = data.delivery_first_name
    this.orderDetails.billing_last_name = data.delivery_last_name
    this.orderDetails.billing_street_aadress = data.delivery_street_aadress
    this.orderDetails.billing_city = data.delivery_city
    this.orderDetails.billing_postcode = data.delivery_postcode
    this.orderDetails.billing_country = data.delivery_country
    this.orderDetails.billing_state = data.delivery_state
    this.orderDetails.billing_country_name = data.delivery_country_name
    this.orderDetails.billing_state_name = data.delivery_state_name
    this.orderDetails.billing_phone = data.delivery_phone
    console.log(data);
  }

  addUserAddressToServer(value) {

    if (this.appUserService.whoIsUser() != "customer") return 0
    let data: { [k: string]: any } = {}
    data = value
    data.first_name = value.delivery_first_name
    data.last_name = value.delivery_last_name
    data.city = value.delivery_city
    data.company = "null"
    data.country_id = value.delivery_country
    data.dob = "2000-01-01"
    data.gender = "Male"
    data.lattitude = "40.7128"
    data.longitude = "74.0060"
    data.postcode = value.delivery_postcode
    data.state_id = value.delivery_state
    data.street_address = value.delivery_street_aadress
    data.suburb = value.delivery_city
    data.phone = value.delivery_phone
    data.is_default = "1"
    data.latlong = "31.411861087325256, 73.10474523829687"
    data.language_id = this.config.languageIdNumber
    data.currency = this.config.currencyIdNumber
    this.appHttpService.postHttp('customer_address_book', data, true).then((data: any) => {
      this.appToastService.toast("address added succesfuly")
    });

  }
  setOrderCurrencyId(value) {

  }
  setOrderSession(value) {
    this.orderDetails.session_id = value
  }
}
