"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedDataService = void 0;
var core_1 = require("@angular/core");
var SharedDataService = /** @class */ (function () {
    function SharedDataService(appEventsService, platform, nav, menuCtrl) {
        this.appEventsService = appEventsService;
        this.platform = platform;
        this.nav = nav;
        this.menuCtrl = menuCtrl;
        this.bannersArray = [1, 1, 1, 1, 1];
        this.tab1Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.tab2Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.tab3Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.flashSaleProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.privacyPolicy = "";
        this.termServices = "";
        this.refundPolicy = "";
        this.aboutUs = "";
        this.tempdata = {};
        this.currentOpenedModel = null;
        this.singleProductPageDataArray = [];
        this.lab = false;
        this.primaryHexColor = "#3980ff";
        this.splashScreenHide = false;
    }
    SharedDataService.prototype.openShopPage = function () {
        this.nav.navigateForward("products");
    };
    SharedDataService.prototype.toggleMenu = function () {
        this.menuCtrl.toggle("mainMenu");
    };
    SharedDataService.prototype.showAd = function () {
        //this.loading.autoHide(2000);
        this.appEventsService.publish('showAd', "");
    };
    SharedDataService.prototype.getProductRatingPercentage = function (rating) {
        var val = (parseFloat(rating) * 100) / 5;
        return val + '%';
    };
    SharedDataService = __decorate([
        core_1.Injectable()
    ], SharedDataService);
    return SharedDataService;
}());
exports.SharedDataService = SharedDataService;
