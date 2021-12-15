"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfigService = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var status_bar_1 = require("@capacitor/status-bar");
if (localStorage.darkModeBool == undefined)
    localStorage.darkModeBool = false;
var ConfigService = /** @class */ (function () {
    function ConfigService(storage, platform, appLogService, oneSignal) {
        this.storage = storage;
        this.platform = platform;
        this.appLogService = appLogService;
        this.oneSignal = oneSignal;
        this.yourSiteUrlString = 'http://rawal-dev.vector-coder.com';
        //public yourSiteUrlString: string = 'https://kundol-api.vector-coder.com'
        this.clientIdString = "1234";
        this.clientSecretString = "sk_1234";
        this.urlString = this.yourSiteUrlString + '/api/client/';
        this.imgThumbnailUrlString = this.yourSiteUrlString + "/gallary/thumbnail";
        this.imgMediumUrlString = this.yourSiteUrlString + "/gallary/medium";
        this.imgLargeUrlString = this.yourSiteUrlString + "/gallary/large";
        this.dummyImageString = "assets/dumy.jpg";
        this.showIntroPageBool = true; //  0 to hide and 1 to show intro page
        this.appInProductionBool = false; //  0 to hide and 1 to show intro page
        this.roundBordersBool = true; //make elements border round
        //app theming
        this.appThemeString = 'default';
        this.darkModeBool = false;
        // app info
        this.appNameString = '';
        this.iosStoreUrlString = "";
        // login page settings
        this.enableFacebookLoginBool = false;
        this.enableGoogleLoginBool = false;
        this.enableEmailLoginBool = false;
        this.enableAddressMapBool = false;
        this.enablePhoneLoginBool = false;
        this.phoneAuthWithFirebaseBool = false;
        // App Design Layout settings
        this.homePageNumber = 0;
        this.bannerStyleNumber = 0;
        this.categoryPageNumber = 0;
        this.productCardStyleNumber = 0;
        this.productSlidesPerPageNumber = 2.1;
        // App currency and language settings
        this.languageCodeString = "";
        this.currencyDecimalNumber = 2;
        this.currencyCodeString = "";
        this.currencyPositionString = "";
        this.appDirectionString = "";
        // Initialize Firebase 
        this.firebaseConfig = {};
        // google map key
        this.googleMapApiString = "";
        // Push notification settings
        this.onesignalAppIdString = "";
        this.onesignalSenderIdString = "";
        // others
        this.inventoryBool = false;
        this.perPageNumber = 10;
        this.currentPlatfromString = "web";
        this.animationDurationNumber = 700; // in milisecounds
        this.currentPlatfromString = core_2.Capacitor.getPlatform();
        this.setUserSettings();
        if (this.onesignalAppIdString != "")
            this.registerOneSignal();
    }
    ConfigService.prototype.registerOneSignal = function () {
        if (core_2.Capacitor.isNativePlatform()) {
            this.oneSignal.startInit(this.onesignalAppIdString, this.onesignalSenderIdString);
            this.oneSignal.endInit();
            this.oneSignal.handleNotificationReceived().subscribe(function () {
                // do something when notification is received
            });
        }
    };
    ConfigService.prototype.defaultSettings = function (settings) {
        var _this = this;
        var homePageNumber = 0;
        settings.forEach(function (element) {
            if (element.setting_key == "app_name")
                _this.appNameString = element.setting_value;
            else if (element.setting_key == "home_style")
                homePageNumber = _this.getIntergerFromString(element.setting_value);
            else if (element.setting_key == "category_style")
                _this.categoryPageNumber = _this.getIntergerFromString(element.setting_value);
            else if (element.setting_key == "card_style")
                _this.productCardStyleNumber = _this.getIntergerFromString(element.setting_value);
            else if (element.setting_key == "banner_style")
                _this.bannerStyleNumber = _this.getIntergerFromString(element.setting_value);
            else if (element.setting_key == "ios_app_url")
                _this.iosStoreUrlString = element.setting_value;
            else if (element.setting_key == "google_login")
                _this.enableGoogleLoginBool = (element.setting_value == "1") ? true : false;
            else if (element.setting_key == "facebook_login")
                _this.enableFacebookLoginBool = (element.setting_value == "1") ? true : false;
            else if (element.setting_key == "phone_login")
                _this.enablePhoneLoginBool = (element.setting_value == "1") ? true : false;
            else if (element.setting_key == "email_login")
                _this.enableEmailLoginBool = (element.setting_value == "1") ? true : false;
            else if (element.setting_key == "inventory")
                _this.inventoryBool = (element.setting_value == "1") ? true : false;
            else if (element.setting_key == "language_id")
                _this.languageIdNumber = parseInt(element.setting_value);
            else if (element.setting_key == "language_code")
                _this.languageCodeString = element.setting_value.toLocaleLowerCase();
            else if (element.setting_key == "direction")
                _this.appDirectionString = element.setting_value;
            else if (element.setting_key == "currency_id")
                _this.currencyIdNumber = parseInt(element.setting_value);
            else if (element.setting_key == "currency_code")
                _this.currencyCodeString = element.setting_value;
            else if (element.setting_key == "currency_pos")
                _this.currencyPositionString = element.setting_value;
            else if (element.setting_key == "currency_symbol")
                _this.currencySymbolString = element.setting_value;
            else if (element.setting_key == "currency_decimals")
                _this.currencyDecimalNumber = parseInt(element.setting_value);
        });
        this.setLanguageAndCurrenyData();
        this.homePageNumber = homePageNumber;
    };
    ConfigService.prototype.getIntergerFromString = function (value) {
        return parseInt((value).replace(/[^0-9]/g, ''));
    };
    ConfigService.prototype.setLanguageAndCurrenyData = function () {
        if (localStorage.languageCodeString == undefined) {
            localStorage.languageCodeString = this.languageCodeString;
            localStorage.languageIdNumber = this.languageIdNumber;
            localStorage.currencyDecimalNumber = this.currencyDecimalNumber;
            localStorage.currencyIdNumber = this.currencyIdNumber;
            localStorage.currencyCodeString = this.currencyCodeString;
            localStorage.currencyPositionString = this.currencyPositionString;
            localStorage.currencySymbolString = this.currencySymbolString;
            localStorage.appDirectionString = this.appDirectionString;
        }
        else {
            this.languageCodeString = localStorage.languageCodeString.toLocaleLowerCase();
            this.languageIdNumber = parseInt(localStorage.languageIdNumber);
            this.currencyDecimalNumber = parseInt(localStorage.currencyDecimalNumber);
            this.currencyIdNumber = parseInt(localStorage.currencyIdNumber);
            this.currencyCodeString = localStorage.currencyCodeString;
            this.currencyPositionString = localStorage.currencyPositionString;
            this.currencySymbolString = localStorage.currencySymbolString;
            this.appDirectionString = localStorage.appDirectionString;
        }
    };
    ConfigService.prototype.setUserSettings = function () {
        if (localStorage.darkModeBool == "true")
            this.enableDarkMode(true);
        else
            this.enableDarkMode(false);
    };
    ConfigService.prototype.enableDarkMode = function (bool) {
        this.darkModeBool = bool;
        this.changeStatusBarColor();
        if (bool)
            localStorage.darkModeBool = "true";
        else
            localStorage.darkModeBool = "false";
    };
    ConfigService.prototype.changeStatusBarColor = function () {
        if (core_2.Capacitor.isNativePlatform()) {
            if (this.darkModeBool) {
                status_bar_1.StatusBar.setStyle({ style: status_bar_1.Style.Dark });
                status_bar_1.StatusBar.setBackgroundColor({ color: "#000000" });
            }
            else {
                status_bar_1.StatusBar.setStyle({ style: status_bar_1.Style.Light });
                status_bar_1.StatusBar.setBackgroundColor({ color: "#ffffff" });
            }
        }
    };
    ConfigService.prototype.transformCurrency = function (value) {
        var currency = this.currencySymbolString;
        var decimals = this.currencyDecimalNumber;
        var currecnyPos = this.currencyPositionString;
        var priceFixed = parseFloat(value).toFixed(decimals);
        //let priceFixed = value;
        if (priceFixed.toString() == 'NaN') {
            if (currecnyPos == 'left')
                return currency + "" + value;
            else
                return value + " " + currency;
        }
        else {
            if (currecnyPos == 'left')
                return currency + "" + priceFixed;
            else
                return priceFixed + "" + currency;
        }
    };
    ConfigService = __decorate([
        core_1.Injectable()
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
