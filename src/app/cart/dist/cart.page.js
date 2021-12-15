"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartPage = void 0;
var core_1 = require("@angular/core");
var CartPage = /** @class */ (function () {
    function CartPage(navCtrl, shared, config, loading, storage, appEventsService, modalCtrl, actionSheetCtrl, appHttpService, appCartService, appUserService, appLogService) {
        this.navCtrl = navCtrl;
        this.shared = shared;
        this.config = config;
        this.loading = loading;
        this.storage = storage;
        this.appEventsService = appEventsService;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.appHttpService = appHttpService;
        this.appCartService = appCartService;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.moreProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.couponCodeString = "";
        this.getMoreProducts();
    }
    CartPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    CartPage.prototype.getMoreProducts = function () {
        var _this = this;
        var url = "products";
        url += "?limit=" + this.config.perPageNumber;
        url += "&getCategory=1";
        url += "&getDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        //url += "&productType=simple"
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&stock=1";
        this.appHttpService.getHttp(url).then(function (data) {
            _this.moreProductsArray = data;
        });
    };
    CartPage.prototype.removeCoupon = function () {
        this.appCartService.removeCoupon();
    };
    CartPage.prototype.ngOnInit = function () {
    };
    CartPage.prototype.applyCoupon = function () {
        this.appCartService.checkCouponAvalability(this.couponCodeString);
    };
    CartPage.prototype.proceedToCheckOut = function () {
        this.navCtrl.navigateForward("/shipping-address");
    };
    CartPage = __decorate([
        core_1.Component({
            selector: 'app-cart',
            templateUrl: './cart.page.html',
            styleUrls: ['./cart.page.scss']
        })
    ], CartPage);
    return CartPage;
}());
exports.CartPage = CartPage;
