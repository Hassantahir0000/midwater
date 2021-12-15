"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductCardComponent = void 0;
var core_1 = require("@angular/core");
var ProductCardComponent = /** @class */ (function () {
    function ProductCardComponent(config, shared, navCtrl, appWishListService, appEventsService, appCartService, appToastService, appAnimationsService) {
        this.config = config;
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.appWishListService = appWishListService;
        this.appEventsService = appEventsService;
        this.appCartService = appCartService;
        this.appToastService = appToastService;
        this.appAnimationsService = appAnimationsService;
        this.wishListFlagBool = false;
        this.quantityNumber = 1;
        this.enableOutOFStockButtonBool = false;
    }
    ProductCardComponent.prototype.openProductPage = function () {
        this.shared.singleProductPageDataArray.push(this.data);
        this.navCtrl.navigateForward("/product-detail/" + this.data.product_id);
    };
    ProductCardComponent.prototype.addRemoveWishProduct = function () {
        this.appWishListService.addRemoveWishProduct(this.data.product_id);
    };
    ProductCardComponent.prototype.isInWishList = function () {
        this.wishListFlagBool = this.appWishListService.productIsInList(this.data.product_id);
        return this.wishListFlagBool;
    };
    ProductCardComponent.prototype.addToCart = function () {
        if (this.data.product_type == 'variable') {
            this.openProductPage();
        }
        else {
            this.checkingProductStock();
        }
    };
    ProductCardComponent.prototype.quantityMinus = function () {
        if (this.quantityNumber > 1) {
            this.quantityNumber--;
            this.checkingProductStock();
        }
    };
    ProductCardComponent.prototype.quantityPlus = function () {
        this.quantityNumber++;
        this.checkingProductStock();
    };
    ProductCardComponent.prototype.checkingProductStock = function () {
        var _this = this;
        this.appCartService.checkProductStock(this.data.product_id, this.data.product_type, null, this.quantityNumber).then(function (data) {
            if (data.status == "outOfStock") {
                _this.enableOutOFStockButtonBool = true;
            }
            else if (data.status == "canAddToCart") {
                _this.appCartService.addToCart(_this.data.product_id, _this.quantityNumber, null);
            }
            else if (data.status == "quantityIsLimited") {
                _this.appToastService.toastError("Quantity is Limited");
                _this.quantityNumber = data.stock;
            }
        });
    };
    ProductCardComponent.prototype.productDiscount = function () {
        var rtn = "";
        var p1 = parseInt(this.data.product_price);
        var p2 = parseInt(this.data.product_discount_price);
        var result = Math.abs((p1 - p2) / p1 * 100);
        result = parseInt(result.toString());
        if (result == 0) {
            return false;
        }
        rtn = '-' + result + '%';
        return rtn;
    };
    ProductCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('productRef', { static: false })
    ], ProductCardComponent.prototype, "productRef");
    __decorate([
        core_1.Input('data')
    ], ProductCardComponent.prototype, "data");
    ProductCardComponent = __decorate([
        core_1.Component({
            selector: 'app-product-card',
            templateUrl: './product-card.component.html',
            styleUrls: ['./product-card.component.scss']
        })
    ], ProductCardComponent);
    return ProductCardComponent;
}());
exports.ProductCardComponent = ProductCardComponent;
