"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductAttributesModalPage = void 0;
var core_1 = require("@angular/core");
var ProductAttributesModalPage = /** @class */ (function () {
    function ProductAttributesModalPage(appToastService, config, modalCtrl, appHttpService, appCartService) {
        this.appToastService = appToastService;
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.appHttpService = appHttpService;
        this.appCartService = appCartService;
        this.data = {};
        this.imageUrlString = "assets/dumy.jpg";
        this.quantityNumber = 1;
        this.priceNumber = 0;
        this.selectedVariationsArray = [];
        this.selectedCombitionProductObject = {};
        this.enableOutOFStockButtonBool = false;
    }
    ProductAttributesModalPage.prototype.ngOnInit = function () {
        this.priceNumber = this.data.product_price;
        if (this.data.product_discount_price != 0)
            this.priceNumber = this.data.product_discount_price;
        if (this.data.product_type == "variable")
            this.setDefaultAttributes();
    };
    ProductAttributesModalPage.prototype.setDefaultAttributes = function () {
        console.clear();
        this.data.product_combination[0].combination.forEach(function (element) {
            console.log(element);
        });
    };
    ProductAttributesModalPage.prototype.addVaration = function (attribute, id, name) {
        var found = 0;
        this.selectedVariationsArray.forEach(function (element) {
            if (attribute == element.attribute) {
                element.id = id;
                element.name = name;
                found++;
            }
        });
        if (found == 0)
            this.selectedVariationsArray.push({ "attribute": attribute, "id": id, "name": name });
        if (this.selectedVariationsArray.length == this.data.attribute.length) {
            this.findAndSelectProductCombination();
        }
    };
    ProductAttributesModalPage.prototype.findAndSelectProductCombination = function () {
        var _this = this;
        var found = 0;
        this.data.product_combination.forEach(function (combinations) {
            found = 0;
            _this.selectedVariationsArray.forEach(function (inner) {
                combinations.combination.forEach(function (element) {
                    if (element.variation_id == inner.id) {
                        console.log(element.variation_id, inner.id);
                        found++;
                    }
                });
                //let searchString = JSON.stringify(combinations)
                //if (searchString.includes('"variation_id":' + inner.id)) found++
                //console.log(inner.name, searchString.includes('"variation_id":' + inner.id))
                if (found == _this.selectedVariationsArray.length)
                    _this.selectedCombitionProductObject = combinations;
            });
        });
        console.log(this.selectedCombitionProductObject);
        this.imageUrlString = this.config.imgThumbnailUrlString + this.selectedCombitionProductObject.gallary.gallary_name;
        this.priceNumber = this.selectedCombitionProductObject.price;
        this.enableOutOFStockButtonBool = false;
    };
    ProductAttributesModalPage.prototype.selectedBadge = function (attribute, id) {
        var found = 0;
        this.selectedVariationsArray.forEach(function (element) {
            if (attribute == element.attribute && id == element.id) {
                found++;
            }
        });
        if (found == 0) {
            return "light";
        }
        else {
            return "primary";
        }
    };
    ProductAttributesModalPage.prototype.addToCart = function () {
        if (this.selectedVariationsArray.length != this.data.attribute.length) {
            var msg = "Please Select all Variations";
            this.appToastService.toastError(msg);
            return;
        }
        else {
            this.checkingProductStock();
        }
    };
    ProductAttributesModalPage.prototype.checkingProductStock = function () {
        var _this = this;
        this.appCartService.checkProductStock(this.data.product_id, this.data.product_type, this.selectedCombitionProductObject.product_combination_id, this.quantityNumber).then(function (data) {
            if (data.status == "outOfStock") {
                _this.enableOutOFStockButtonBool = true;
            }
            else if (data.status == "canAddToCart") {
                _this.appCartService.addToCart(_this.data.product_id, _this.quantityNumber, _this.selectedCombitionProductObject.product_combination_id);
            }
            else if (data.status == "quantityIsLimited") {
                _this.appToastService.toastError("Quantity is Limited");
                _this.quantityNumber = data.stock;
            }
        });
    };
    ProductAttributesModalPage.prototype.quantityMinus = function () {
        if (this.quantityNumber > 1) {
            this.quantityNumber--;
            this.enableOutOFStockButtonBool = false;
        }
    };
    ProductAttributesModalPage.prototype.calculatePrice = function () {
        return this.quantityNumber * this.priceNumber;
    };
    ProductAttributesModalPage.prototype.quantityPlus = function () {
        //this.enableOutOFStockButtonBool = false
        this.quantityNumber++;
    };
    //close modal
    ProductAttributesModalPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        core_1.Input()
    ], ProductAttributesModalPage.prototype, "data");
    ProductAttributesModalPage = __decorate([
        core_1.Component({
            selector: 'app-product-attributes-modal',
            templateUrl: './product-attributes-modal.page.html',
            styleUrls: ['./product-attributes-modal.page.scss']
        })
    ], ProductAttributesModalPage);
    return ProductAttributesModalPage;
}());
exports.ProductAttributesModalPage = ProductAttributesModalPage;
