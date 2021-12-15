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
exports.ProductsPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var ProductsPage = /** @class */ (function () {
    function ProductsPage(navCtrl, activatedRoute, config, shared, appHttpService, loading, appEventsService, actionSheet, menuCtrl, appTranslationService, appCartService, appUserService, appLogService, appCategoriesService) {
        this.navCtrl = navCtrl;
        this.activatedRoute = activatedRoute;
        this.config = config;
        this.shared = shared;
        this.appHttpService = appHttpService;
        this.loading = loading;
        this.appEventsService = appEventsService;
        this.actionSheet = actionSheet;
        this.menuCtrl = menuCtrl;
        this.appTranslationService = appTranslationService;
        this.appCartService = appCartService;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.appCategoriesService = appCategoriesService;
        this.scrollTopButton = false;
        this.products = new Array;
        this.selectedTab = 0;
        this.categoryId = this.selectedTab;
        this.categogiesSelectNumber = this.selectedTab;
        this.categoryName = '';
        this.searchString = "";
        //sortArray = ['id', 'price', 'product_type', 'discount_price', 'product_status', 'product_view', 'seo_desc', 'created_at']
        // sortTypeArray = ['ASC', 'DESC']
        this.sortArray = ['newest', 'a - z', 'z - a', 'price : high - low', 'price : low - high', 'top seller', 'on sale', 'featured'];
        this.sortOrder = this.sortArray[0];
        this.sortOrderValue = "created_at";
        this.sortType = 'ASC';
        this.page = 1;
        this.applyFilter = false;
        this.filters = [];
        this.selectedFilters = [];
        this.price = { lower: 0, upper: 10000 };
        this.maxAmount = 10000;
        this.side = "right";
        this.productView = 'grid';
        this.httpRunning = true;
        this.hidePriceRange = false;
        if (config.appDirectionString == "rtl")
            this.side = "left";
        var catIdParam = this.activatedRoute.snapshot.paramMap.get('id');
        var typeParam = this.activatedRoute.snapshot.paramMap.get('type');
        var searchParam = this.activatedRoute.snapshot.paramMap.get('search');
        if (catIdParam != null) {
            this.selectedTab = this.categoryId = this.categogiesSelectNumber = parseInt(catIdParam);
        }
        if (typeParam != null) {
            this.sortOrder = typeParam;
        }
        if (searchParam != null) {
            this.searchString = searchParam;
        }
        console.log(catIdParam, typeParam, searchParam);
        this.getProducts(null);
        this.getFilters(this.categoryId);
    }
    ProductsPage.prototype.removeSearchFilter = function () {
        this.searchString = "";
        this.resetProductPageCountAndScrollThenGetNewProducts();
    };
    ProductsPage.prototype.removeAttribute = function (id) {
        this.addVaration({ id: id }, { id: id });
        this.applyFilters();
    };
    ProductsPage.prototype.getAttributeName = function (id) {
        var r = "";
        this.filters.forEach(function (x) {
            x.variations.forEach(function (y) {
                if (id == y.id) {
                    r = y.detail[0].name;
                }
            });
        });
        return r;
    };
    ProductsPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ProductsPage.prototype.showSelectedFilters = function () {
        if (this.selectedFilters.length != 0)
            return true;
        else if (this.categoryId != 0)
            return true;
        else if (this.sortOrder != this.sortArray[0])
            return true;
        else if (this.searchString != '')
            return true;
    };
    ProductsPage.prototype.getProducts = function (infiniteScroll) {
        var _this = this;
        this.httpRunning = true;
        if (this.page == 1) {
            this.loading.show();
        }
        var url = "products";
        url += "?limit=" + this.config.perPageNumber;
        url += "&getCategory=1";
        url += "&getDetail=1";
        url += "&language_id=" + this.config.languageIdNumber;
        //url += "&productType=simple"
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&stock=1";
        url += "&page=" + this.page;
        url += "&sortBy=" + this.sortOrderValue;
        url += "&sortType=" + this.sortType; //(ASC,DESC)
        if (this.searchString != "")
            url += "&searchParameter=" + this.searchString;
        if (this.sortOrder == "top seller")
            url += "&topSelling=1";
        if (this.sortOrder == "featured")
            url += "&isFeatured=1";
        if (this.selectedTab != 0)
            url += "&productCategories=" + this.selectedTab;
        if (this.applyFilter == true) {
            url += "&price_from=" + this.price.lower;
            url += "&price_to=" + this.price.upper;
            if (this.selectedFilters.length != 0) {
                url += "&variations=" + this.selectedFilters.toString();
            }
        }
        this.appHttpService.getHttp(url).then(function (data) {
            _this.httpRunning = false;
            // console.log(data.product_data.length + "   " + this.page);
            _this.infinite.complete();
            if (_this.page == 1) {
                _this.products = new Array;
                _this.loading.hide();
                _this.scrollToTop();
            }
            _this.page++;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var value = data_1[_i];
                _this.products.push(value);
            }
            if (data.length == 0) {
                _this.infinite.disabled = true;
            }
        });
    };
    //changing tab
    ProductsPage.prototype.changeTab = function (c) {
        if (c == this.categoryId)
            return;
        console.log(c);
        this.applyFilter = false;
        this.infinite.disabled = false;
        this.page = 1;
        this.categogiesSelectNumber = this.categoryId = this.selectedTab = c;
        console.log(this.categoryId);
        //this.getProducts(null);
        this.removeFilters();
        //this.getFilters(this.selectedTab);
    };
    //============================================================================================  
    //getting countries from server
    ProductsPage.prototype.getFilters = function (id) {
        var _this = this;
        var url = "attributes";
        url += "?limit=" + 1000;
        url += "&language_id=" + this.config.languageIdNumber;
        url += "&currency=" + this.config.currencyIdNumber;
        url += "&getVariation=1";
        url += "&getVariationByLarguage=1";
        this.appHttpService.getHttp(url).then(function (data) {
            _this.filters = data;
        });
    };
    ;
    ProductsPage.prototype.selectedBadge = function (att, v) {
        var attribute = att.detail[0].name;
        var valueName = v.detail[0].name;
        var valueId = v.id;
        var found = 0;
        this.selectedFilters.forEach(function (value, index) {
            if (value == valueId) {
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
    ProductsPage.prototype.addVaration = function (att, v) {
        var _this = this;
        // let attribute = att.detail[0].name
        // let valueName = v.detail[0].name
        var valueId = v.id;
        var found = 0;
        this.selectedFilters.forEach(function (value, index) {
            //value.name == attribute && value.value == valueName && value.id == valueId
            if (value == valueId) {
                _this.selectedFilters.splice(index, 1);
                found++;
            }
        });
        //{ 'name': attribute, 'value': valueName, 'id': valueId }
        if (found == 0)
            this.selectedFilters.push(valueId);
        //console.log(this.selectedFilters)
    };
    ProductsPage.prototype.applyFilters = function () {
        this.applyFilter = true;
        this.resetProductPageCountAndScrollThenGetNewProducts();
        this.menuCtrl.close("menu2");
    };
    ProductsPage.prototype.resetFilters = function () {
        this.getFilters(this.selectedTab);
        this.menuCtrl.close("menu2");
    };
    ProductsPage.prototype.removeFilters = function () {
        this.selectedFilters = [];
        this.applyFilter = false;
        this.menuCtrl.close("menu2");
        this.resetProductPageCountAndScrollThenGetNewProducts();
        this.getFilters(this.selectedTab);
    };
    ProductsPage.prototype.resetProductPageCountAndScrollThenGetNewProducts = function () {
        this.page = 1;
        this.infinite.disabled = false;
        this.getProducts(null);
    };
    ProductsPage.prototype.ngOnChanges = function () {
    };
    ProductsPage.prototype.getSortProducts = function (value) {
        //console.log(value);
        if (value == this.sortOrder)
            return 0;
        else {
            this.sortOrder = value;
            if (this.sortOrder == "newest") {
                this.sortOrderValue = 'created_at';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "price : high - low") {
                this.sortOrderValue = 'price';
                this.sortType = "DESC";
            }
            if (this.sortOrder == "price : low - high") {
                this.sortOrderValue = 'price';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "top seller") {
                this.sortOrderValue = 'created_at';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "on sale") {
                this.sortOrderValue = 'discount_price';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "featured") {
                this.sortOrderValue = 'created_at';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "a - z") {
                this.sortOrderValue = 'created_at';
                this.sortType = "ASC";
            }
            if (this.sortOrder == "z - a") {
                this.sortOrderValue = 'created_at';
                this.sortType = "DESC";
            }
            this.resetProductPageCountAndScrollThenGetNewProducts();
        }
        //sortArray = ['id', 'price', 'product_type', 'discount_price', 'product_status', 'product_view', 'seo_desc', 'created_at']
        // sortTypeArray = ['ASC', 'DESC']
        // sortArray = ['newest', 'a - z', 'z - a', 'price : high - low', 'price : low - high', 'top seller', 'on sale', 'featured'];
    };
    ProductsPage.prototype.openSortBy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buttonArray;
            var _this = this;
            return __generator(this, function (_a) {
                buttonArray = [];
                this.appTranslationService.translateArray(this.sortArray).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var _loop_1, key, action;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _loop_1 = function (key) {
                                    buttonArray.push({ text: res[key], handler: function () { _this.getSortProducts(key); } });
                                };
                                for (key in res) {
                                    _loop_1(key);
                                }
                                this.appTranslationService.translateString("Cancel").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        buttonArray.push({
                                            text: res,
                                            role: 'cancel',
                                            handler: function () {
                                            }
                                        });
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [4 /*yield*/, this.actionSheet.create({
                                        cssClass: 'shop-action-sheet',
                                        buttons: buttonArray
                                    })];
                            case 1:
                                action = _a.sent();
                                return [4 /*yield*/, action.present()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ProductsPage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle("menu2");
    };
    ProductsPage.prototype.changeLayout = function () {
        if (this.productView == 'list')
            this.productView = "grid";
        else
            this.productView = "list";
        this.scrollToTop();
    };
    ProductsPage.prototype.scrollToTop = function () {
        try {
            this.content.scrollToTop(700);
            this.scrollTopButton = false;
        }
        catch (error) {
        }
    };
    ProductsPage.prototype.onScroll = function (e) {
        if (e.scrollTop >= 1200)
            this.scrollTopButton = true;
        if (e.scrollTop < 1200)
            this.scrollTopButton = false;
        //else this.scrollTopButton=false;
        //   console.log(e);
    };
    ProductsPage.prototype.ionViewDidEnter = function () {
    };
    ProductsPage.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(angular_1.IonInfiniteScroll, { static: false })
    ], ProductsPage.prototype, "infinite");
    __decorate([
        core_1.ViewChild(angular_1.IonContent, { static: false })
    ], ProductsPage.prototype, "content");
    __decorate([
        core_1.ViewChild(angular_1.IonSlides, { static: false })
    ], ProductsPage.prototype, "slides");
    ProductsPage = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.page.html',
            styleUrls: ['./products.page.scss']
        })
    ], ProductsPage);
    return ProductsPage;
}());
exports.ProductsPage = ProductsPage;
