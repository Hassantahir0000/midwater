"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddressesPage = void 0;
var core_1 = require("@angular/core");
var AddressesPage = /** @class */ (function () {
    function AddressesPage(navCtrl, shared, modalCtrl, config, appEventsService, loading, appOrderService, appUserService, appHttpService, appToastService) {
        this.navCtrl = navCtrl;
        this.shared = shared;
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.appEventsService = appEventsService;
        this.loading = loading;
        this.appOrderService = appOrderService;
        this.appUserService = appUserService;
        this.appHttpService = appHttpService;
        this.appToastService = appToastService;
        this.currentViewString = "addresslist"; // or add new address
        this.disableSaveButtonBool = true;
        this.editAddressData = null;
    }
    AddressesPage.prototype.onClickEditAddress = function (value) {
        console.log(value);
        this.editAddressData = value;
        this.showAddNewAddressSecton();
    };
    AddressesPage.prototype.cancelAddAddress = function () {
        this.currentViewString = "addresslist";
    };
    AddressesPage.prototype.showCancelButton = function () {
        if (this.appUserService.whoIsUser() == "customer")
            return true;
    };
    AddressesPage.prototype.showAddNewAddressSecton = function () {
        this.currentViewString = "addnewaddress";
    };
    AddressesPage.prototype.getFormData = function (event) {
        this.disableSaveButtonBool = !event.valid;
        this.shippingAddressformData = event.value;
    };
    AddressesPage.prototype.saveFormData = function () {
        if (this.editAddressData == null) { //if (!this.appOrderService.addressIsFilled() && this.appUserService.whoIsUser() == "customer")
            this.appOrderService.addUserAddressToServer(this.shippingAddressformData);
            this.appOrderService.setOrderShippingAddress(this.shippingAddressformData);
            this.appOrderService.setOrderBillingAddress(this.shippingAddressformData);
            this.cancelAddAddress();
        }
        else {
            this.updateAddressOnServer(this.shippingAddressformData);
        }
    };
    AddressesPage.prototype.updateAddressOnServer = function (value) {
        var _this = this;
        var data = {};
        data = value;
        data.first_name = value.delivery_first_name;
        data.last_name = value.delivery_last_name;
        data.city = value.delivery_city;
        data.company = this.editAddressData.company;
        data.country_id = value.delivery_country;
        data.dob = this.editAddressData.dob;
        data.gender = this.editAddressData.gender;
        data.lattitude = this.editAddressData.lattitude;
        data.longitude = this.editAddressData.longitude;
        data.postcode = value.delivery_postcode;
        data.state_id = value.delivery_state;
        data.street_address = value.delivery_street_aadress;
        data.suburb = value.delivery_city;
        data.phone = value.delivery_phone;
        data.latlong = "31.411861087325256, 73.10474523829687";
        //data.is_default = this.editAddressData.default_address.toString()
        data.language_id = this.config.languageIdNumber;
        data.currency = this.config.currencyIdNumber;
        this.appHttpService.putHttp('customer_address_book/' + this.editAddressData.id, data, true).then(function (data) {
            _this.appToastService.toast("updated");
            _this.editAddressData = null;
            _this.cancelAddAddress();
        });
    };
    AddressesPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    AddressesPage.prototype.ngOnInit = function () {
    };
    AddressesPage = __decorate([
        core_1.Component({
            selector: 'app-addresses',
            templateUrl: './addresses.page.html',
            styleUrls: ['./addresses.page.scss']
        })
    ], AddressesPage);
    return AddressesPage;
}());
exports.AddressesPage = AddressesPage;
