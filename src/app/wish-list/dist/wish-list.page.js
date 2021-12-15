"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WishListPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var WishListPage = /** @class */ (function () {
    function WishListPage(navCtrl, config, appHttpService, loading, shared, appUserService, appCartService, appWishListService) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.appHttpService = appHttpService;
        this.loading = loading;
        this.shared = shared;
        this.appUserService = appUserService;
        this.appCartService = appCartService;
        this.appWishListService = appWishListService;
        this.page = 0;
        this.httpRunning = false;
        this.productsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.pageNumber = 1;
    }
    WishListPage.prototype.openSearchPage = function () {
        this.navCtrl.navigateForward("search");
    };
    WishListPage.prototype.ngOnInit = function () {
    };
    WishListPage.prototype.ionViewDidEnter = function () {
        this.pullRefresh();
    };
    WishListPage.prototype.pullRefresh = function () {
        this.pageNumber = 1;
        this.productsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.getProducts();
    };
    WishListPage.prototype.getProducts = function () {
        var _this = this;
        var url = "wishlist";
        url += "?limit=" + this.config.perPageNumber;
        url += "&getCategory=1";
        url += "&products=1";
        url += "&getDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&stock=1";
        url += "&page=" + this.pageNumber;
        this.appHttpService.getHttp(url).then(function (data) {
            var dat = data;
            _this.infinite.complete();
            if (_this.pageNumber == 1)
                _this.productsArray = [];
            if (dat.length != 0)
                for (var _i = 0, dat_1 = dat; _i < dat_1.length; _i++) {
                    var value = dat_1[_i];
                    _this.productsArray.push(value.products);
                }
            if (dat.length < _this.config.perPageNumber)
                _this.infinite.disabled = true;
            _this.pageNumber++;
            _this.ionRefresher.complete();
        });
    };
    WishListPage.prototype.getTrashIconName = function () {
        this.removeHeartIcon();
        return 'trash';
    };
    WishListPage.prototype.removeHeartIcon = function () {
        try {
            var heartIcons = document.querySelectorAll('.wish-list-content .right-fab');
            for (var i = 0; i < heartIcons.length; i++) {
                heartIcons[i].remove();
            }
        }
        catch (error) {
        }
    };
    WishListPage.prototype.remove = function (p) {
        var _this = this;
        this.appWishListService.addRemoveWishProduct(p.product_id);
        this.productsArray.forEach(function (value, index) {
            if (value.product_id == p.product_id) {
                _this.productsArray.splice(index, 1);
            }
        });
    };
    __decorate([
        core_1.ViewChild(angular_1.IonInfiniteScroll, { static: false })
    ], WishListPage.prototype, "infinite");
    __decorate([
        core_1.ViewChild(angular_1.IonRefresher, { static: false })
    ], WishListPage.prototype, "ionRefresher");
    WishListPage = __decorate([
        core_1.Component({
            selector: 'app-wish-list',
            templateUrl: './wish-list.page.html',
            styleUrls: ['./wish-list.page.scss']
        })
    ], WishListPage);
    return WishListPage;
}());
exports.WishListPage = WishListPage;
