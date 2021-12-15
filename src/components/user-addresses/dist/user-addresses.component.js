"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserAddressesComponent = void 0;
var core_1 = require("@angular/core");
var UserAddressesComponent = /** @class */ (function () {
    function UserAddressesComponent(config, appHttpService, appUserService, appOrderService, appToastService) {
        this.config = config;
        this.appHttpService = appHttpService;
        this.appUserService = appUserService;
        this.appOrderService = appOrderService;
        this.appToastService = appToastService;
        this.onClickAddNew = new core_1.EventEmitter();
        this.onClickEditAddress = new core_1.EventEmitter();
        this.editButtons = false; //product data
        this.addressArray = [];
    }
    UserAddressesComponent.prototype.onClickAddNewButton = function () {
        this.onClickAddNew.emit();
    };
    UserAddressesComponent.prototype.getAddresses = function () {
        var _this = this;
        this.addressArray = [1, 1, 1, 1, 1];
        var url = "customer_address_book";
        url += "?limit=" + 100;
        url += "&language_id=" + this.config.languageIdNumber;
        url += "&currency=" + this.config.currencyIdNumber;
        this.appHttpService.getHttp(url).then(function (data) {
            _this.addressArray = data;
            _this.addressArray.forEach(function (element) {
                if (element.default_address == 1) {
                    _this.selectedAddressObject = element;
                    _this.addOrderUserAddress(_this.selectedAddressObject, false);
                }
            });
        });
    };
    UserAddressesComponent.prototype.getAddressData = function (v) {
        var selected = false;
        if (v.default_address == 1) {
            selected = true;
        }
        if (v == 1)
            return 1;
        else
            return {
                text1: v.customer.customer_first_name + ' ' + v.customer.customer_last_name,
                text2: v.country_id.country_name,
                text3: v.street_address + " " + v.city + " " + v.postcode,
                selected: selected
            };
    };
    UserAddressesComponent.prototype.addOrderUserAddress = function (address, updateOnServer) {
        if (updateOnServer === void 0) { updateOnServer = true; }
        if (this.editButtons)
            return 0;
        this.selectedAddressObject = address;
        var add = {
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
        };
        this.appOrderService.setOrderShippingAddress(add);
        this.appOrderService.setOrderBillingAddress(add);
        if (updateOnServer)
            this["default"](address);
    };
    UserAddressesComponent.prototype.ngOnInit = function () {
        this.getAddresses();
    };
    //========================================================================
    UserAddressesComponent.prototype["default"] = function (address) {
        var _this = this;
        var data = {};
        data = address;
        data.country_id = address.country_id.country_id;
        data.state_id = address.state_id.id;
        data.is_default = '1';
        data.language_id = this.config.languageIdNumber;
        data.currency = this.config.currencyIdNumber;
        data.latlong = "31.411861087325256, 73.10474523829687";
        this.appHttpService.putHttp('customer_address_book/' + data.id, data, true).then(function (data) {
            _this.appToastService.toast("updated");
            _this.getAddresses();
        });
    };
    UserAddressesComponent.prototype["delete"] = function (a) {
        var _this = this;
        this.appHttpService.deleteHttp("customer_address_book/" + a.id, {}, true).then(function (data) {
            _this.getAddresses();
        });
    };
    UserAddressesComponent.prototype.edit = function (a) {
        this.onClickEditAddress.emit(a);
    };
    __decorate([
        core_1.Output()
    ], UserAddressesComponent.prototype, "onClickAddNew");
    __decorate([
        core_1.Output()
    ], UserAddressesComponent.prototype, "onClickEditAddress");
    __decorate([
        core_1.Input('editButtons')
    ], UserAddressesComponent.prototype, "editButtons");
    UserAddressesComponent = __decorate([
        core_1.Component({
            selector: 'app-user-addresses',
            templateUrl: './user-addresses.component.html',
            styleUrls: ['./user-addresses.component.scss']
        })
    ], UserAddressesComponent);
    return UserAddressesComponent;
}());
exports.UserAddressesComponent = UserAddressesComponent;
