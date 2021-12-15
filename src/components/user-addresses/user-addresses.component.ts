import { newArray } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss'],
})
export class UserAddressesComponent implements OnInit {

  @Output() onClickAddNew = new EventEmitter();
  @Output() onClickEditAddress = new EventEmitter();
  @Input('editButtons') editButtons = false;//product data

  selectedAddressObject;
  constructor(
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public appUserService: AppUserService,
    public appOrderService: AppOrderService,
    public appToastService: AppToastService,
  ) {

  }

  onClickAddNewButton() {
    this.onClickAddNew.emit()
  }
  public addressArray: any = []
  getAddresses() {
    this.addressArray = [1, 1, 1, 1, 1]
    let url = "customer_address_book"
    url += "?limit=" + 100
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber

    this.appHttpService.getHttp(url).then((data: any) => {
      this.addressArray = data
      this.addressArray.forEach(element => {
        if (element.default_address == 1) {
          this.selectedAddressObject = element
          this.addOrderUserAddress(this.selectedAddressObject, false)
        }
      });
    })
  }

  getAddressData(v) {
    let selected = false
    if (v.default_address == 1) {
      selected = true
    }
    if (v == 1)
      return 1
    else
      return {
        text1: v.customer.customer_first_name + ' ' + v.customer.customer_last_name,
        text2: v.country_id.country_name,
        text3: v.street_address + " " + v.city + " " + v.postcode,
        selected: selected
      }
  }

  addOrderUserAddress(address, updateOnServer = true) {
    if (this.editButtons) return 0
    this.selectedAddressObject = address
    let add = {
      delivery_city: address.city,
      delivery_country: address.country_id.country_id,
      delivery_country_name: address.country_id.country_name,
      delivery_first_name: address.customer.customer_first_name,
      delivery_last_name: address.customer.customer_last_name,
      delivery_phone: "00000000000",
      delivery_postcode: address.postcode,
      delivery_state: address.state_id.id,
      delivery_state_name: address.state_id.name,
      delivery_street_aadress: address.street_address
    }
    this.appOrderService.setOrderShippingAddress(add)
    this.appOrderService.setOrderBillingAddress(add)
    if (updateOnServer) this.default(address)
  }

  ngOnInit() {
    this.getAddresses()
  }
  //========================================================================
  default(address) {
    let data: { [k: string]: any } = {}
    data = address
    data.country_id = address.country_id.country_id
    data.state_id = address.state_id.id
    data.is_default = '1'
    data.language_id = this.config.languageIdNumber
    data.currency = this.config.currencyIdNumber
    data.latlong = "31.411861087325256, 73.10474523829687"
    this.appHttpService.putHttp('customer_address_book/' + data.id, data, true).then((data: any) => {
      this.appToastService.toast("updated")
      this.getAddresses()
    });
  }

  delete(a) {
    this.appHttpService.deleteHttp("customer_address_book/" + a.id, {}, true).then((data: any) => {
      this.getAddresses()
    })
  }
  edit(a) {
    this.onClickEditAddress.emit(a)
  }
}
