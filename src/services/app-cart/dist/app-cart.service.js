"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppCartService = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var haptics_1 = require("@capacitor/haptics");
var AppCartService = /** @class */ (function () {
    function AppCartService(storage, config, shared, appUserService, appHttpService, appToastService, nav, couponService, appEventsService) {
        this.storage = storage;
        this.config = config;
        this.shared = shared;
        this.appUserService = appUserService;
        this.appHttpService = appHttpService;
        this.appToastService = appToastService;
        this.nav = nav;
        this.couponService = couponService;
        this.appEventsService = appEventsService;
        this.cartProductsArray = new Array();
        this.cartquantityNumber = 0.0;
        this.cartTaxFloat = 0.0;
        this.cartSubTotalFloat = 0.0;
        this.cartShippingFloat = 0.0;
        this.cartTotalFloat = 0.0;
        this.cartDiscountFloat = 0.0;
        //============================================== coupon =================================
        this.couponObject = null;
        this.registerEvents();
        if (this.appUserService.userIsLogedIn())
            this.getCartFromServer();
    }
    AppCartService.prototype.registerEvents = function () {
        var _this = this;
        var userLogin = this.appEventsService.subscribe("userLogin");
        userLogin.subscriptions.add(userLogin.event.subscribe(function (data) {
            _this.getCartFromServer();
        }));
        var userLogout = this.appEventsService.subscribe("userLogout");
        userLogout.subscriptions.add(userLogout.event.subscribe(function (data) {
            _this.emptyCart();
        }));
    };
    AppCartService.prototype.emptyCart = function () {
        this.cartProductsArray = [];
        this.removeCoupon;
        this.cartTotalItems();
    };
    AppCartService.prototype.openCartPage = function () {
        this.nav.navigateForward("cart");
    };
    AppCartService.prototype.getCartFromServer = function () {
        var _this = this;
        var url = "";
        if (this.appUserService.whoIsUser() == "customer") {
            url = "cart";
            url += "?language_id=" + this.config.languageIdNumber;
            url += "&currency=" + this.config.currencyIdNumber;
        }
        else {
            url = "cart/guest/get";
            url += "?session_id=" + this.appUserService.getGuestSession();
            url += "&language_id=" + this.config.languageIdNumber;
            url += "&currency=" + this.config.currencyIdNumber;
        }
        this.appHttpService.getHttp(url, false).then(function (data) {
            _this.cartProductsArray = data;
            if (_this.cartProductsArray.length == 0)
                _this.removeCoupon();
            _this.cartTotalItems();
        });
    };
    AppCartService.prototype.checkProductStock = function (id, type, combinationId, quantity) {
        var _this = this;
        if (combinationId === void 0) { combinationId = null; }
        var url = "available_qty";
        url += "?product_id=" + id;
        if (combinationId != null)
            url += "&product_combination_id=" + combinationId;
        url += "&product_type=" + type;
        return new Promise(function (resolve) {
            _this.appHttpService.getHttp(url, true).then(function (data) {
                var stock = parseInt(data.remaining_stock);
                if (stock == 0) {
                    resolve({ status: "outOfStock" });
                }
                else if (stock >= quantity) {
                    resolve({ status: "canAddToCart" });
                }
                else if (stock < quantity) {
                    resolve({ status: "quantityIsLimited", stock: stock });
                }
            });
        });
    };
    AppCartService.prototype.addToCart = function (id, quantity, combinationId) {
        var _this = this;
        if (combinationId === void 0) { combinationId = null; }
        var data = {};
        data.product_id = id;
        data.qty = quantity;
        if (combinationId != null)
            data.product_combination_id = combinationId;
        if (this.appUserService.checkIfGuestSessionIsAvailable())
            data.session_id = this.appUserService.getGuestSession();
        var url = "cart/guest/store";
        if (this.appUserService.whoIsUser() == "customer")
            url = "cart";
        this.appHttpService.postHttp(url, data, true).then(function (data) {
            _this.appToastService.toastMiddle("Added to Cart!");
            if (core_2.Capacitor.isNativePlatform())
                haptics_1.Haptics.vibrate();
            if (_this.appUserService.whoIsUser() == "guest")
                _this.appUserService.setGuestSession(data.session);
            _this.getCartFromServer();
        });
    };
    AppCartService.prototype.deleteProductFromCart = function (id, combinationId) {
        var _this = this;
        if (combinationId === void 0) { combinationId = null; }
        var data = {};
        data.product_id = id.toString();
        if (combinationId != null)
            data.product_combination_id = combinationId;
        if (this.appUserService.checkIfGuestSessionIsAvailable())
            data.session_id = this.appUserService.getGuestSession();
        var url = "cart/guest/delete";
        if (this.appUserService.whoIsUser() == "customer")
            url = "cart/delete";
        this.appHttpService.deleteHttp(url, data, true).then(function (data) {
            _this.appToastService.toastMiddle("Deleted From Cart!");
            if (core_2.Capacitor.isNativePlatform())
                haptics_1.Haptics.vibrate();
            _this.getCartFromServer();
        });
    };
    AppCartService.prototype.calculateFinalPrice = function () {
        this.cartTotalFloat = 0;
        //this.cartTaxFloat = 0
        this.cartSubTotalFloat = 0;
        //this.cartShippingFloat = 0
        //this.cartDiscountFloat = 0
        var total = 0;
        this.cartProductsArray.forEach(function (value, index) {
            var price = value.total;
            //if (value.discount_price != null) price = value.discount_price
            total += price;
        });
        this.cartSubTotalFloat = total;
        this.cartTotalFloat = total + this.cartTaxFloat + this.cartShippingFloat - this.cartDiscountFloat;
    };
    //Function calcualte the total items of cart
    AppCartService.prototype.cartTotalItems = function () {
        var total = 0;
        for (var _i = 0, _a = this.cartProductsArray; _i < _a.length; _i++) {
            var value = _a[_i];
            total += parseInt(value.qty);
        }
        this.cartquantityNumber = total;
        this.calculateFinalPrice();
        //console.log("updated", this.cartquantity);
        return total;
    };
    ;
    AppCartService.prototype.checkCouponAvalability = function (value) {
        var _this = this;
        var url = "coupon";
        url += "?coupon_code=" + value;
        this.appHttpService.postHttp(url, {}, true).then(function (data) {
            _this.couponObject = data;
            _this.applyCoupon();
            _this.calculateFinalPrice();
            _this.appToastService.toastMiddle("Coupon Applied!");
        });
    };
    AppCartService.prototype.applyCoupon = function () {
        if (this.couponObject) {
            if (this.couponObject.type == "fixed") {
                this.cartDiscountFloat = this.couponObject.amount;
            }
            if (this.couponObject.type == "percentage") {
                var discount = (this.cartSubTotalFloat / 100) * this.couponObject.amount;
                this.cartDiscountFloat = discount;
            }
        }
    };
    AppCartService.prototype.removeCoupon = function () {
        this.cartDiscountFloat = 0;
        this.calculateFinalPrice();
    };
    AppCartService.prototype.getProductQuantity = function (id) {
        var quantity = 0;
        this.cartProductsArray.forEach(function (element) {
            if (element.product_id == id) {
                quantity = element.qty;
            }
        });
        return quantity;
    };
    AppCartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppCartService);
    return AppCartService;
}());
exports.AppCartService = AppCartService;
