"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyOrdersPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var MyOrdersPage = /** @class */ (function () {
    function MyOrdersPage(navCtrl, http, config, shared, appHttpService, loading, appUserService, appCartService) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.config = config;
        this.shared = shared;
        this.appHttpService = appHttpService;
        this.loading = loading;
        this.appUserService = appUserService;
        this.appCartService = appCartService;
        this.httpRunning = false;
        this.segmentsTabs = "pending";
        this.ordersArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.pageNumber = 1;
    }
    MyOrdersPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MyOrdersPage.prototype.pullRefresh = function () {
        this.pageNumber = 1;
        this.ordersArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.getOrders();
    };
    MyOrdersPage.prototype.getOrders = function () {
        var _this = this;
        var url = "customer/order";
        url += "?limit=" + this.config.perPageNumber;
        url += "&orderDetail=1";
        url += "&productDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&page=" + this.pageNumber;
        this.appHttpService.getHttp(url).then(function (data) {
            var dat = data;
            _this.infinite.complete();
            if (_this.pageNumber == 1)
                _this.ordersArray = [];
            if (dat.length != 0)
                for (var _i = 0, dat_1 = dat; _i < dat_1.length; _i++) {
                    var value = dat_1[_i];
                    _this.ordersArray.push(value);
                }
            if (dat.length < _this.config.perPageNumber)
                _this.infinite.disabled = true;
            _this.pageNumber++;
            _this.ionRefresher.complete();
        });
    };
    MyOrdersPage.prototype.getOrderTotalPrice = function (o) {
        var priceFixed = parseFloat(o.order_price.toString()).toFixed(o.currency.decimal_place);
        return priceFixed + o.currency.code;
    };
    MyOrdersPage.prototype.getFilteredOrders = function () {
        if (this.ordersArray[0] == 1)
            return this.ordersArray;
        if (this.segmentsTabs == 'pending') {
            var orders_1 = [];
            this.ordersArray.forEach(function (element) {
                if (element.order_status.toLocaleLowerCase() == "pending")
                    orders_1.push(element);
            });
            return orders_1;
        }
        if (this.segmentsTabs == 'delivered') {
            var orders_2 = [];
            this.ordersArray.forEach(function (element) {
                if (element.order_status.toLocaleLowerCase() == "delivered")
                    orders_2.push(element);
            });
            return orders_2;
        }
        if (this.segmentsTabs == 'cancelled') {
            var orders_3 = [];
            this.ordersArray.forEach(function (element) {
                if (element.order_status.toLocaleLowerCase() == "cancelled")
                    orders_3.push(element);
            });
            return orders_3;
        }
    };
    MyOrdersPage.prototype.ngOnInit = function () {
        this.getOrders();
    };
    MyOrdersPage.prototype.showOrderDetail = function (order) {
        this.navCtrl.navigateForward("/my-order-detail/" + order.order_id);
    };
    MyOrdersPage.prototype.openProductsPage = function () {
        this.navCtrl.navigateForward("tabs/home");
    };
    __decorate([
        core_1.ViewChild(angular_1.IonInfiniteScroll, { static: false })
    ], MyOrdersPage.prototype, "infinite");
    __decorate([
        core_1.ViewChild(angular_1.IonRefresher, { static: false })
    ], MyOrdersPage.prototype, "ionRefresher");
    MyOrdersPage = __decorate([
        core_1.Component({
            selector: 'app-my-orders',
            templateUrl: './my-orders.page.html',
            styleUrls: ['./my-orders.page.scss']
        })
    ], MyOrdersPage);
    return MyOrdersPage;
}());
exports.MyOrdersPage = MyOrdersPage;
