"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductDetailPage = void 0;
var core_1 = require("@angular/core");
var product_attributes_modal_page_1 = require("../modals/product-attributes-modal/product-attributes-modal.page");
var share_1 = require("@capacitor/share");
var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, config, shared, appCartService, appHttpService, modalCtrl, loading, appEventsService, activatedRoute, appTranslationService, appToastService, appAlertService, appUserService, appWishListService, appAnimationsService, sanitizer, appLogService, photoViewer) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.shared = shared;
        this.appCartService = appCartService;
        this.appHttpService = appHttpService;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.appEventsService = appEventsService;
        this.activatedRoute = activatedRoute;
        this.appTranslationService = appTranslationService;
        this.appToastService = appToastService;
        this.appAlertService = appAlertService;
        this.appUserService = appUserService;
        this.appWishListService = appWishListService;
        this.appAnimationsService = appAnimationsService;
        this.sanitizer = sanitizer;
        this.appLogService = appLogService;
        this.photoViewer = photoViewer;
        this.dataJson = {};
        this.sliderConfig = {
            zoom: true
        };
        this.wishListFlagBool = false;
        this.relatedProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.quantityNumber = 1;
        this.priceNumber = 0;
        this.enableOutOFStockButtonBool = false;
        this.getProductData();
    }
    ProductDetailPage.prototype.zoomImage = function (image) {
        this.photoViewer.show(image);
    };
    ProductDetailPage.prototype.checkingProductStock = function () {
        var _this = this;
        this.appCartService.checkProductStock(this.dataJson.product_id, this.dataJson.product_type, null, this.quantityNumber).then(function (data) {
            if (data.status == "outOfStock") {
                _this.enableOutOFStockButtonBool = true;
            }
            else if (data.status == "canAddToCart") {
                _this.appCartService.addToCart(_this.dataJson.product_id, _this.quantityNumber, null);
            }
            else if (data.status == "quantityIsLimited") {
                _this.appToastService.toastError("Quantity is Limited");
                _this.quantityNumber = data.stock;
            }
        });
    };
    ProductDetailPage.prototype.addRemoveWishProduct = function () {
        this.appWishListService.addRemoveWishProduct(this.dataJson.product_id);
    };
    ProductDetailPage.prototype.getHeartColor = function () {
        if (this.isInWishList())
            return 'danger';
        else
            return 'medium';
    };
    ProductDetailPage.prototype.isInWishList = function () {
        return this.appWishListService.productIsInList(this.dataJson.product_id);
    };
    ProductDetailPage.prototype.quantityMinus = function () {
        if (this.quantityNumber > 1)
            this.quantityNumber--;
    };
    ProductDetailPage.prototype.calculatePrice = function () {
        return this.quantityNumber * this.priceNumber;
    };
    ProductDetailPage.prototype.quantityPlus = function () {
        this.quantityNumber++;
    };
    ProductDetailPage.prototype.addToCartButton = function () {
        if (this.dataJson.product_type == "variable")
            this.openProductAttributesModal();
        else {
            this.checkingProductStock();
        }
    };
    ProductDetailPage.prototype.productDataIsEmpty = function () {
        for (var prop in this.dataJson) {
            if (this.dataJson.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };
    ProductDetailPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ProductDetailPage.prototype.ngOnInit = function () {
    };
    ProductDetailPage.prototype.getProductData = function () {
        var _this = this;
        var id = this.activatedRoute.snapshot.paramMap.get('id');
        var url = "products/" + id;
        url += "?language_id=" + this.config.languageIdNumber;
        url += "&getCategory=1";
        url += "&getDetail=1";
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&stock=1";
        this.appHttpService.getHttp(url).then(function (data) {
            _this.dataJson = data;
            _this.getRelatedProducts();
        });
    };
    ProductDetailPage.prototype.getRelatedProducts = function () {
        var _this = this;
        var url = "products";
        url += "?limit=" + this.config.perPageNumber;
        url += "&getCategory=1";
        url += "&getDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        //url += "&productType=simple"
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&stock=1";
        url += "&productCategories=" + this.dataJson.category[0].category_detail.detail[0].category_id;
        this.appHttpService.getHttp(url).then(function (data) {
            _this.relatedProductsArray = data;
        });
    };
    ProductDetailPage.prototype.getLowestProductPrice = function () {
        var r = this.dataJson.product_combination[0].price;
        this.dataJson.product_combination.forEach(function (element) {
            if (element.price < r)
                r = element.price;
        });
        return r;
    };
    ProductDetailPage.prototype.getHighestProductPrice = function () {
        var r = this.dataJson.product_combination[0].price;
        this.dataJson.product_combination.forEach(function (element) {
            if (element.price > r)
                r = element.price;
        });
        return r;
    };
    ProductDetailPage.prototype.productDiscount = function () {
        var rtn = "";
        var p1 = parseInt(this.dataJson.product_price);
        var p2 = parseInt(this.dataJson.product_discount_price);
        var result = Math.abs((p1 - p2) / p1 * 100);
        result = parseInt(result.toString());
        if (result == 0) {
            return false;
        }
        rtn = '-' + result + '%';
        return rtn;
    };
    ProductDetailPage.prototype.openProductAttributesModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: product_attributes_modal_page_1.ProductAttributesModalPage,
                            cssClass: 'product-attributes-modal',
                            componentProps: {
                                data: this.dataJson
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductDetailPage.prototype.openReviewsPage = function () {
        this.navCtrl.navigateForward("/reviews/" + this.dataJson.product_id);
    };
    ProductDetailPage.prototype.share = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shareRet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, share_1.Share.share({
                            title: this.dataJson.detail[0].title,
                            text: this.dataJson.detail[0].title,
                            url: this.config.urlString,
                            dialogTitle: this.dataJson.detail[0].title
                        })];
                    case 1:
                        shareRet = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDetailPage = __decorate([
        core_1.Component({
            selector: 'app-product-detail',
            templateUrl: './product-detail.page.html',
            styleUrls: ['./product-detail.page.scss']
        })
    ], ProductDetailPage);
    return ProductDetailPage;
}());
exports.ProductDetailPage = ProductDetailPage;
