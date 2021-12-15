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
exports.SettingsPage = void 0;
var core_1 = require("@angular/core");
var login_page_1 = require("../modals/login/login.page");
var privacy_policy_page_1 = require("../modals/privacy-policy/privacy-policy.page");
var term_services_page_1 = require("../modals/term-services/term-services.page");
var refund_policy_page_1 = require("../modals/refund-policy/refund-policy.page");
var language_page_1 = require("../modals/language/language.page");
var currency_list_page_1 = require("../modals/currency-list/currency-list.page");
var app_log_page_page_1 = require("../modals/app-log-page/app-log-page.page");
var app_settings_modal_page_1 = require("../modals/app-settings-modal/app-settings-modal.page");
var share_1 = require("@capacitor/share");
var browser_1 = require("@capacitor/browser");
var app_1 = require("@capacitor/app");
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, modalCtrl, config, appHttpService, storage, loading, appEventsService, shared, 
    //public iab: InAppBrowser,
    plt, appUserService, appLogService, appCartService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.appHttpService = appHttpService;
        this.storage = storage;
        this.loading = loading;
        this.appEventsService = appEventsService;
        this.shared = shared;
        this.plt = plt;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.appCartService = appCartService;
        this.setting = {};
        this.tapCounter = 0;
    }
    SettingsPage.prototype.openSettingsModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: app_settings_modal_page_1.AppSettingsModalPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SettingsPage.prototype.changeDarkMode = function () {
        this.config.darkModeBool = this.setting.darkMode;
        this.updateSetting();
    };
    SettingsPage.prototype.updateSetting = function () {
        console.log(this.setting);
        this.storage.set('setting', this.setting);
    };
    SettingsPage.prototype.openLoginPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: login_page_1.LoginPage,
                            componentProps: {
                                'hideGuestLogin': true
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
    SettingsPage.prototype.openCurrencyPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: currency_list_page_1.CurrencyListPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SettingsPage.prototype.logOut = function () {
        this.appUserService.logOut();
    };
    SettingsPage.prototype.openAccountPage = function () {
        this.navCtrl.navigateForward("/my-account");
    };
    SettingsPage.prototype.openSite = function () {
        this.loading.autoHide(2000);
        //this.iab.create(this.config.yourSiteUrlString, "blank");
    };
    //============================================================================================
    //turning on off local  notification
    SettingsPage.prototype.onOffPushNotification = function () {
        // var dat: { [k: string]: any } = {};
        // dat.device_id = this.appPushNotificationService.pushNotificationId;
        // if (this.setting.notification == false) dat.is_notify = 0;
        // else dat.is_notify = 1;
        // this.appHttpService.postHttp('notify_me', dat).then((data: any) => {
        //   if (data.success == 1) {
        //     this.updateSetting();
        //   }
        // });
    };
    ;
    SettingsPage.prototype.hideShowFooterMenu = function () {
        this.appEventsService.publish('setting', this.setting);
        this.updateSetting();
    };
    SettingsPage.prototype.hideShowCartButton = function () {
        this.appEventsService.publish('setting', this.setting);
        this.updateSetting();
    };
    SettingsPage.prototype.showModal = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, modal, modal, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(value == 'language')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: language_page_1.LanguagePage
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(value == 'privacyPolicy')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: privacy_policy_page_1.PrivacyPolicyPage
                            })];
                    case 4:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        if (!(value == 'termServices')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: term_services_page_1.TermServicesPage
                            })];
                    case 7:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9: return [4 /*yield*/, this.modalCtrl.create({
                            component: refund_policy_page_1.RefundPolicyPage
                        })];
                    case 10:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 11: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SettingsPage.prototype.ionViewWillEnter = function () {
        this.getStoredSettings();
    };
    SettingsPage.prototype.getStoredSettings = function () {
        var _this = this;
        this.storage.get('setting').then(function (val) {
            if (val != null || val != undefined) {
                _this.setting = val;
            }
            else {
                _this.setting.localNotification = true;
                _this.setting.notification = true;
                _this.setting.cartButton = true;
                _this.setting.footer = true;
            }
            _this.setting.darkMode = _this.config.darkModeBool;
            //this.changeDarkMode();
        });
    };
    SettingsPage.prototype.rateUs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.config.currentPlatfromString == "ios")) return [3 /*break*/, 2];
                        return [4 /*yield*/, browser_1.Browser.open({ url: this.config.iosStoreUrlString.toString() })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, app_1.App.getInfo()];
                    case 3:
                        info = _a.sent();
                        return [4 /*yield*/, browser_1.Browser.open({ url: "https://play.google.com/store/apps/details?id=" + info.id })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.share = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shareRet, deviceInfo, shareRet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading.autoHide(2000);
                        if (!(this.config.currentPlatfromString == "ios")) return [3 /*break*/, 2];
                        return [4 /*yield*/, share_1.Share.share({
                                title: this.config.appNameString,
                                text: this.config.appNameString,
                                url: this.config.iosStoreUrlString.toString(),
                                dialogTitle: this.config.iosStoreUrlString.toString()
                            })];
                    case 1:
                        shareRet = _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, app_1.App.getInfo()];
                    case 3:
                        deviceInfo = _a.sent();
                        return [4 /*yield*/, share_1.Share.share({
                                title: deviceInfo.name,
                                text: deviceInfo.name,
                                url: "https://play.google.com/store/apps/details?id=" + deviceInfo.id,
                                dialogTitle: deviceInfo.name
                            })];
                    case 4:
                        shareRet = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.showOption = function (value) {
        // if (this.config.wishListPage && value == "wishListPage" && this.appUserService.customerData.customers_id != null) { return true; }
        // else if (this.config.editProfilePage && value == "editPage" && this.appUserService.customerData.customers_id != null) { return true; }
        // else if (value == "changePasswordPage" && this.appUserService.customerData.customers_id != null) { return true; }
        // else if (value == "address" && this.appUserService.customerData.customers_id != null) { return true; }
        // else if (this.config.myOrdersPage && value == "myOrdersPage" && this.appUserService.customerData.customers_id != null) { return true; }
        // else if (this.config.contactUsPage && value == "contactPage") { return true; }
        // else if (this.config.aboutUsPage && value == "aboutUsPage") { return true; }
        // else if (this.config.newsPage && value == "newsPage") { return true; }
        // else if (this.config.introPage && value == "introPage") { return true; }
        // else if (this.config.shareApp && value == "sharePage") { return true; }
        // else if (this.config.rateApp && value == "ratePage") { return true; }
        // else if (this.config.settingPage && value == "settingsPage") { return true; }
        //else
        return true;
    };
    SettingsPage.prototype.openPage = function (value) {
        if (value == "share")
            this.share();
        else if (value == "rate")
            this.rateUs();
        else
            this.navCtrl.navigateForward('/' + value);
    };
    SettingsPage.prototype.ngOnInit = function () {
    };
    SettingsPage.prototype.openLogPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: app_log_page_page_1.AppLogPagePage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SettingsPage.prototype.userTapHeader = function () {
        this.tapCounter++;
        if (this.tapCounter == 10) {
            this.openLogPage();
            this.tapCounter = 0;
        }
    };
    SettingsPage = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.page.html',
            styleUrls: ['./settings.page.scss']
        })
    ], SettingsPage);
    return SettingsPage;
}());
exports.SettingsPage = SettingsPage;
