"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DemoSettingsPage = void 0;
var core_1 = require("@angular/core");
var DemoSettingsPage = /** @class */ (function () {
    function DemoSettingsPage(loading, modalCont, config, appCartService, nav, appHttpService, shared, appWishListService, appRecentProductsService, appLogService) {
        this.loading = loading;
        this.modalCont = modalCont;
        this.config = config;
        this.appCartService = appCartService;
        this.nav = nav;
        this.appHttpService = appHttpService;
        this.shared = shared;
        this.appWishListService = appWishListService;
        this.appRecentProductsService = appRecentProductsService;
        this.appLogService = appLogService;
        this.colors = [
            { value: '#3E5902', name: 'default' },
            //{ value: '#ffffff', name: 'white' },
            { value: '#EC3F34', name: 'green' },
            { value: '#BF04A0', name: 'red' },
            { value: '#FCAD8E', name: 'magnesium' },
            { value: '#FF8EA6', name: 'salmon' },
            { value: '#44B3FF', name: 'plum' },
            { value: '#9546FE', name: 'blue' },
            { value: '#A6633C', name: 'pink' },
            { value: '#3CA68D', name: 'orange' },
            { value: '#3C51A6', name: 'maroon' },
            { value: '#726DFF', name: 'cayanne' },
            { value: '#FF6D6D', name: 'sea' },
            { value: '#B3182A', name: 'theme15' },
            { value: '#3980ff', name: 'theme16' },
            { value: '#483A6F', name: 'theme17' },
            { value: '#621529', name: 'theme18' },
        ];
        this.themeMode = 'dark';
        this.loaderLanguages = true;
        this.loaderCurrecny = true;
        this.banner = "1";
        //================================================================
        this.languagesArray = [];
        this.currencyListArray = [];
        this.getLanguages();
        this.getListOfCurrency();
        if (this.config.darkModeBool) {
            this.themeMode = 'dark';
        }
        else {
            this.themeMode = 'light';
        }
        //this.banner = this.config.bannerStyle;
        console.log(this.config.darkModeBool, this.themeMode);
    }
    DemoSettingsPage.prototype.modeChange = function () {
        if (this.themeMode == 'dark') {
            this.config.enableDarkMode(true);
        }
        else {
            this.config.enableDarkMode(false);
        }
    };
    DemoSettingsPage.prototype.setBannerStyle = function (banner) {
        // this.config.setBannerStyle(banner);
        // this.config.bannerStyle = banner
    };
    DemoSettingsPage.prototype.setCardStyle = function (card) {
        this.config.productCardStyleNumber = card;
        this.dismiss();
    };
    DemoSettingsPage.prototype.setCategoryStyle = function (s) {
        this.config.categoryPageNumber = s;
        this.dismiss();
    };
    DemoSettingsPage.prototype.setHomeStyle = function (s) {
        this.config.homePageNumber = s;
        this.dismiss();
    };
    //close modal
    DemoSettingsPage.prototype.dismiss = function () {
        this.modalCont.dismiss();
    };
    DemoSettingsPage.prototype.ngOnInit = function () {
    };
    DemoSettingsPage.prototype.changeAppTheme = function (value) {
        this.config.appThemeString = value;
    };
    DemoSettingsPage.prototype.getLanguages = function () {
        var _this = this;
        //getting all languages
        this.appHttpService.getHttp('language?page=1&limit=100').then(function (data) {
            _this.loaderLanguages = false;
            _this.languagesArray = data;
            for (var _i = 0, _a = _this.languagesArray; _i < _a.length; _i++) {
                var data_1 = _a[_i];
                if (data_1.id == _this.config.languageIdNumber) {
                    _this.selectedLanguage = data_1;
                }
            }
        });
    };
    DemoSettingsPage.prototype.updateLanguage = function (lang) {
        var _this = this;
        if (lang != undefined && this.config.languageIdNumber != lang.id) {
            this.loading.show();
            localStorage.languageIdNumber = lang.id;
            localStorage.languageCodeString = lang.code;
            localStorage.appDirectionString = lang.direction;
            //this.appCartService.emptyCart();
            //this.appRecentProductsService.emptyRecentViewed();
            setTimeout(function () {
                window.location.reload();
                _this.loading.hide();
            }, 900);
        }
    };
    DemoSettingsPage.prototype.getListOfCurrency = function () {
        var _this = this;
        this.appHttpService.getHttp('currency').then(function (data) {
            _this.currencyListArray = data;
            _this.loaderCurrecny = false;
            _this.currencyListArray.forEach(function (val) {
                if (_this.config.currencyIdNumber == val.currency_id)
                    _this.selectedCurrency = val;
            });
        });
    };
    DemoSettingsPage.prototype.updateCurrency = function (value) {
        var _this = this;
        if (value != undefined && this.config.currencyIdNumber != value.currency_id) {
            this.loading.show();
            localStorage.currencyIdNumber = value.currency_id;
            localStorage.currencyCodeString = value.title;
            localStorage.currencySymbolString = value.code;
            localStorage.currencyPositionString = value.symbol_position;
            localStorage.currencyDecimalNumber = value.decimal_place;
            console.log(value);
            //this.appCartService.emptyCart();
            //this.appRecentProductsService.emptyRecentViewed();
            setTimeout(function () {
                window.location.reload();
                _this.loading.hide();
            }, 900);
        }
    };
    DemoSettingsPage = __decorate([
        core_1.Component({
            selector: 'app-demo-settings',
            templateUrl: './demo-settings.page.html',
            styleUrls: ['./demo-settings.page.scss']
        })
    ], DemoSettingsPage);
    return DemoSettingsPage;
}());
exports.DemoSettingsPage = DemoSettingsPage;
