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
exports.AppOnStartService = void 0;
var core_1 = require("@angular/core");
var intro_page_1 = require("src/app/intro/intro.page");
var AppOnStartService = /** @class */ (function () {
    function AppOnStartService(storage, modalCtrl, appHttp, config, shared, appEventsService, appTranslationService, appUserService, appHttpService, appRecentProductsService, appCategoriesService, appWishListService, appNetworkService) {
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.appHttp = appHttp;
        this.config = config;
        this.shared = shared;
        this.appEventsService = appEventsService;
        this.appTranslationService = appTranslationService;
        this.appUserService = appUserService;
        this.appHttpService = appHttpService;
        this.appRecentProductsService = appRecentProductsService;
        this.appCategoriesService = appCategoriesService;
        this.appWishListService = appWishListService;
        this.appNetworkService = appNetworkService;
        console.log("onstart called");
    }
    //============================================================================
    AppOnStartService.prototype.getSettingsFromServer = function () {
        return this.appHttp.getHttp('setting?app_setting=1');
    };
    //============================================================================ 
    AppOnStartService.prototype.loadAppSetting = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('appSettings').then(function (val) {
                if (val == null) {
                    _this.getSettingsFromServer().then(function (response) {
                        var appSettings = {};
                        appSettings = response;
                        _this.onSettingsLoaded(appSettings);
                        resolve(appSettings);
                    });
                }
                else {
                    var appSettings = val;
                    _this.onSettingsLoaded(appSettings);
                    resolve(appSettings);
                }
            });
        });
    };
    //============================================================================
    //initalizing app after getting data from the server or local storage
    AppOnStartService.prototype.onSettingsLoaded = function (data) {
        this.openIntroPage();
        this.storage.set("appSettings", data);
        this.config.defaultSettings(data);
        this.settingDirectionOfApp();
        this.loadAppTranslation();
        this.getBanners();
        this.getCategories();
        if (this.appUserService.whoIsUser() == 'customer')
            this.appWishListService.getWishListProducts();
        //this.getPages()
        //this.appRecentProductsService.getRecentProducts()
        //firebase.initializeApp(this.config.firebaseConfig)
        this.checkingNewSettingsFromServer();
    };
    AppOnStartService.prototype.openIntroPage = function () {
        var _this = this;
        this.storage.get('firsttimeApp').then(function (val) { return __awaiter(_this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("firsttimeApp", val);
                        if (!(this.config.showIntroPageBool && val == null)) return [3 /*break*/, 2];
                        this.storage.set('firsttimeApp', 'firstTime');
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: intro_page_1.IntroPage
                            })];
                    case 1:
                        modal = _a.sent();
                        return [2 /*return*/, modal.present()];
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    //============================================================================
    AppOnStartService.prototype.settingDirectionOfApp = function () {
        //setting direction of the application
        document.documentElement.dir = this.config.appDirectionString;
    };
    //============================================================================
    AppOnStartService.prototype.loadAppTranslation = function () {
        var _this = this;
        var url = 'assets/i18n/' + this.config.languageCodeString + ".json";
        this.appHttpService.angularHttpGet(url).then(function (data) {
            var tempdata = {};
            Object.keys(data).forEach(function (key) {
                var value = data[key];
                var k = key.toLocaleLowerCase();
                tempdata[k] = value;
            });
            _this.appTranslationService.translationListArray = tempdata;
        });
    };
    //============================================================================
    AppOnStartService.prototype.getBanners = function () {
        var _this = this;
        //getting all banners
        this.appHttpService.getHttp('banner?getBannerNavigation=1&getBannerMedia=1').then(function (data) {
            _this.shared.bannersArray = data;
        });
    };
    AppOnStartService.prototype.getNewestProducts = function () {
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
            _this.shared.tab1Array = data;
        });
    };
    //============================================================================
    AppOnStartService.prototype.getCategories = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        var pageLimit = 100;
        var url = 'category';
        url += "?page=" + 1;
        url += "&getDetail=" + 1;
        url += "&limit=" + pageLimit;
        url += "&getMedia=" + 1;
        url += "&language_id=" + this.config.languageIdNumber;
        //getting all allCategories
        this.appHttpService.getHttp(url).then(function (data) {
            var resoponse = data;
            if (resoponse.length == pageLimit)
                _this.getCategories(++page);
            _this.appCategoriesService.sortCategories(resoponse);
        });
    };
    //============================================================================
    AppOnStartService.prototype.getPages = function () {
        var _this = this;
        //getting tab 1
        var data = {};
        if (this.appUserService.customerData.customers_id != null)
            data.customers_id = this.appUserService.customerData.customers_id;
        data.page_number = 0;
        data.language_id = this.config.languageIdNumber;
        data.currency_code = this.config.currencyCodeString;
        //getting allpages from the server
        this.appHttpService.postHttp('getallpages', data).then(function (data) {
            if (data.success == 1) {
                var pages = data.pages_data;
                for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
                    var value = pages_1[_i];
                    if (value.slug == 'privacy-policy')
                        _this.shared.privacyPolicy = value.description;
                    if (value.slug == 'term-services')
                        _this.shared.termServices = value.description;
                    if (value.slug == 'refund-policy')
                        _this.shared.refundPolicy = value.description;
                    if (value.slug == 'about-us')
                        _this.shared.aboutUs = value.description;
                }
            }
        });
    };
    //============================================================================
    AppOnStartService.prototype.checkingNewSettingsFromServer = function () {
        var _this = this;
        this.getSettingsFromServer().then(function (data) {
            if (data.success == "1") {
                var settings = data;
                _this.storage.set("appSettings", settings);
            }
        });
    };
    AppOnStartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppOnStartService);
    return AppOnStartService;
}());
exports.AppOnStartService = AppOnStartService;
