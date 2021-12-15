"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrencyListPage = void 0;
var core_1 = require("@angular/core");
var CurrencyListPage = /** @class */ (function () {
    function CurrencyListPage(loading, config, shared, appCartService, modalCtrl, appHttpService, appRecentProductsService, appLogService) {
        this.loading = loading;
        this.config = config;
        this.shared = shared;
        this.appCartService = appCartService;
        this.modalCtrl = modalCtrl;
        this.appHttpService = appHttpService;
        this.appRecentProductsService = appRecentProductsService;
        this.appLogService = appLogService;
        this.currencyListArray = [];
        this.getListOfCurrency();
    }
    CurrencyListPage.prototype.getListOfCurrency = function () {
        var _this = this;
        this.loading.show();
        this.appHttpService.getHttp('currency').then(function (data) {
            _this.loading.hide();
            _this.currencyListArray = data;
            _this.currencyListArray.forEach(function (val) {
                if (_this.config.currencyIdNumber == val.currency_id)
                    _this.selectedCurrency = val;
            });
        });
    };
    CurrencyListPage.prototype.updateCurrency = function (value) {
        var _this = this;
        if (value != undefined && this.config.currencyIdNumber != value.currency_id) {
            this.loading.show();
            localStorage.currencyIdNumber = value.currency_id;
            localStorage.currencyCodeString = value.title;
            localStorage.currencySymbolString = value.code;
            localStorage.currencyPositionString = value.symbol_position;
            localStorage.currencyDecimalNumber = value.decimal_place;
            //this.appCartService.emptyCart();
            //this.appRecentProductsService.emptyRecentViewed();
            setTimeout(function () {
                window.location.reload();
                _this.loading.hide();
            }, 900);
        }
    };
    CurrencyListPage.prototype.getSelectedColor = function (c) {
        if (c.currency_id == this.config.currencyIdNumber) {
            return 'primary';
        }
    };
    //close modal
    CurrencyListPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    CurrencyListPage.prototype.ngOnInit = function () {
    };
    CurrencyListPage = __decorate([
        core_1.Component({
            selector: 'app-currency-list',
            templateUrl: './currency-list.page.html',
            styleUrls: ['./currency-list.page.scss']
        })
    ], CurrencyListPage);
    return CurrencyListPage;
}());
exports.CurrencyListPage = CurrencyListPage;
