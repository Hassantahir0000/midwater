"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppOrderService = void 0;
var core_1 = require("@angular/core");
var AppOrderService = /** @class */ (function () {
    function AppOrderService(appUserService, appHttpService, config, appToastService) {
        this.appUserService = appUserService;
        this.appHttpService = appHttpService;
        this.config = config;
        this.appToastService = appToastService;
        this.orderDetails = {
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
    }
    AppOrderService.prototype.addressIsFilled = function () {
        if (this.orderDetails.delivery_first_name == "")
            return false;
        else
            return true;
    };
    AppOrderService.prototype.setOrderShippingAddress = function (data) {
        this.orderDetails.delivery_first_name = data.delivery_first_name;
        this.orderDetails.delivery_last_name = data.delivery_last_name;
        this.orderDetails.delivery_street_aadress = data.delivery_street_aadress;
        this.orderDetails.delivery_city = data.delivery_city;
        this.orderDetails.delivery_postcode = data.delivery_postcode;
        this.orderDetails.delivery_country = data.delivery_country;
        this.orderDetails.delivery_state = data.delivery_state;
        this.orderDetails.delivery_country_name = data.delivery_country_name;
        this.orderDetails.delivery_state_name = data.delivery_state_name;
        this.orderDetails.delivery_phone = data.delivery_phone;
    };
    AppOrderService.prototype.setOrderBillingAddress = function (data) {
        this.orderDetails.billing_first_name = data.delivery_first_name;
        this.orderDetails.billing_last_name = data.delivery_last_name;
        this.orderDetails.billing_street_aadress = data.delivery_street_aadress;
        this.orderDetails.billing_city = data.delivery_city;
        this.orderDetails.billing_postcode = data.delivery_postcode;
        this.orderDetails.billing_country = data.delivery_country;
        this.orderDetails.billing_state = data.delivery_state;
        this.orderDetails.billing_country_name = data.delivery_country_name;
        this.orderDetails.billing_state_name = data.delivery_state_name;
        this.orderDetails.billing_phone = data.delivery_phone;
        console.log(data);
    };
    AppOrderService.prototype.addUserAddressToServer = function (value) {
        var _this = this;
        if (this.appUserService.whoIsUser() != "customer")
            return 0;
        var data = {};
        data = value;
        data.first_name = value.delivery_first_name;
        data.last_name = value.delivery_last_name;
        data.city = value.delivery_city;
        data.company = "null";
        data.country_id = value.delivery_country;
        data.dob = "2000-01-01";
        data.gender = "Male";
        data.lattitude = "40.7128";
        data.longitude = "74.0060";
        data.postcode = value.delivery_postcode;
        data.state_id = value.delivery_state;
        data.street_address = value.delivery_street_aadress;
        data.suburb = value.delivery_city;
        data.phone = value.delivery_phone;
        data.is_default = "1";
        data.latlong = "31.411861087325256, 73.10474523829687";
        data.language_id = this.config.languageIdNumber;
        data.currency = this.config.currencyIdNumber;
        this.appHttpService.postHttp('customer_address_book', data, true).then(function (data) {
            _this.appToastService.toast("address added succesfuly");
        });
    };
    AppOrderService.prototype.setOrderCurrencyId = function (value) {
    };
    AppOrderService.prototype.setOrderSession = function (value) {
        this.orderDetails.session_id = value;
    };
    AppOrderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppOrderService);
    return AppOrderService;
}());
exports.AppOrderService = AppOrderService;
