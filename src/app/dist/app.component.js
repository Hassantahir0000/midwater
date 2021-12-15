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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var demo_settings_page_1 = require("./modals/demo-settings/demo-settings.page");
var app_1 = require("@capacitor/app");
var AppComponent = /** @class */ (function () {
    function AppComponent(config, modalCtrl, appOnStartService, router, zone, shared, appCategoriesService, appUserService) {
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.appOnStartService = appOnStartService;
        this.router = router;
        this.zone = zone;
        this.shared = shared;
        this.appCategoriesService = appCategoriesService;
        this.appUserService = appUserService;
        this.openedCategories = [];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        if (core_2.Capacitor.isNativePlatform()) {
            this.initializeDeepLink();
        }
        this.initializeDeepLink();
        this.appOnStartService.loadAppSetting();
    };
    AppComponent.prototype.initializeDeepLink = function () {
        var _this = this;
        app_1.App.addListener('appUrlOpen', function (data) {
            _this.zone.run(function () {
                // Example url: https://beerswift.app/tabs/tab2
                // slug = /tabs/tab2 
                // let string1 = data.url
                // let string2 = this.config.urlString
                console.log(data);
                // if (string1.indexOf(string2) != -1) {
                //   this.router.navigateByUrl('/tabs/home');
                // }
                var slug = data.url.split(".com").pop();
                if (slug) {
                    _this.router.navigateByUrl(slug);
                }
                // If no match, do nothing - let regular routing
                // logic take over
            });
        });
    };
    AppComponent.prototype.openDemoSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: demo_settings_page_1.DemoSettingsPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppComponent.prototype.categoryListIsSelected = function (id) {
        var opened = false;
        this.openedCategories.forEach(function (element) {
            if (id == element)
                opened = true;
        });
        return opened;
    };
    AppComponent.prototype.getRightIcon = function (id) {
        if (this.categoryListIsSelected(id)) {
            return "chevron-down-outline";
        }
        else {
            return "chevron-forward-outline";
        }
    };
    AppComponent.prototype.showHideCategoryList = function (id) {
        var _this = this;
        var found = 0;
        this.openedCategories.forEach(function (value, index) {
            if (id == value) {
                found++;
                _this.openedCategories.splice(index, 1);
            }
        });
        if (found == 0)
            this.openedCategories.push(id);
    };
    AppComponent.prototype.openCategory = function (id) {
        this.router.navigateByUrl("products/" + id);
        this.shared.toggleMenu();
    };
    AppComponent.prototype.openShopByFilter = function (value) {
        this.router.navigateByUrl("products/0/" + value);
        this.shared.toggleMenu();
    };
    AppComponent.prototype.getTitleName = function () {
        if (this.appUserService.userIsLogedIn())
            return this.appUserService.customerData.firstName;
        else
            return "guest";
    };
    AppComponent.prototype.ngAfterViewInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
