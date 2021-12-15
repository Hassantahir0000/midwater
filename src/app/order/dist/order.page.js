"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var OrderPage = /** @class */ (function () {
    function OrderPage(navCtrl, appCartService, config, appHttpService, loading, appToastService, appOrderService, appUserService) {
        this.navCtrl = navCtrl;
        this.appCartService = appCartService;
        this.config = config;
        this.appHttpService = appHttpService;
        this.loading = loading;
        this.appToastService = appToastService;
        this.appOrderService = appOrderService;
        this.appUserService = appUserService;
    }
    OrderPage.prototype.addToOrder = function () {
        var _this = this;
        if (this.appOrderService.orderDetails.payment_method == "Stripe") {
            if (!this.stripeForm.form.valid) {
                this.appToastService.toastError("invalid card data");
                return 0;
            }
        }
        this.appOrderService.orderDetails.currency_id = this.config.currencyIdNumber;
        if (this.appUserService.checkIfGuestSessionIsAvailable())
            this.appOrderService.orderDetails.session_id = this.appUserService.getGuestSession();
        this.appHttpService.postHttp('order', this.appOrderService.orderDetails, true).then(function (data) {
            _this.appToastService.toast("Order Placed");
            _this.navCtrl.navigateRoot("thank-you");
        });
    };
    OrderPage.prototype.getShippingAddressData = function () {
        var selected = false;
        return {
            text1: this.appOrderService.orderDetails.delivery_first_name + ' ' + this.appOrderService.orderDetails.delivery_last_name,
            text2: this.appOrderService.orderDetails.delivery_country_name,
            text3: this.appOrderService.orderDetails.delivery_street_aadress + " " + this.appOrderService.orderDetails.delivery_city + " " + this.appOrderService.orderDetails.delivery_postcode,
            selected: selected
        };
    };
    OrderPage.prototype.getBillingAddressData = function () {
        var selected = false;
        return {
            text1: this.appOrderService.orderDetails.billing_first_name + ' ' + this.appOrderService.orderDetails.billing_last_name,
            text2: this.appOrderService.orderDetails.billing_country_name,
            text3: this.appOrderService.orderDetails.billing_street_aadress + " " + this.appOrderService.orderDetails.billing_city + " " + this.appOrderService.orderDetails.billing_postcode,
            selected: selected
        };
    };
    OrderPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    OrderPage.prototype.ngOnInit = function () {
        this.stripeFormChangeEvent();
    };
    OrderPage.prototype.stripeFormChangeEvent = function () {
        var _this = this;
        this.stripeForm.form.valueChanges.subscribe(function (x) {
            console.log(_this.stripeForm.form.valid);
        });
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent, { static: false })
    ], OrderPage.prototype, "content");
    __decorate([
        core_1.ViewChild('stripeForm', { static: true })
    ], OrderPage.prototype, "stripeForm");
    OrderPage = __decorate([
        core_1.Component({
            selector: 'app-order',
            templateUrl: './order.page.html',
            styleUrls: ['./order.page.scss']
        })
    ], OrderPage);
    return OrderPage;
}());
exports.OrderPage = OrderPage;
