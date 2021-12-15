"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyAccountPage = void 0;
var core_1 = require("@angular/core");
var MyAccountPage = /** @class */ (function () {
    function MyAccountPage(config, shared, appHttpService, appToastService, loading, appUserService, navCtrl, appLogService) {
        this.config = config;
        this.shared = shared;
        this.appHttpService = appHttpService;
        this.appToastService = appToastService;
        this.loading = loading;
        this.appUserService = appUserService;
        this.navCtrl = navCtrl;
        this.appLogService = appLogService;
        this.myAccountData = {
            first_name: '',
            last_name: '',
            password_confirmation: '',
            password: ''
        };
    }
    MyAccountPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    //============================================================================================  
    //function updating user information
    MyAccountPage.prototype.updateInfo = function () {
        var _this = this;
        var info = this.myAccountData;
        this.appHttpService.putHttp('profile/' + this.appUserService.customerData.id, info, true, true).then(function (data) {
            _this.myAccountData.first_name = data.customer_first_name;
            _this.myAccountData.last_name = data.customer_last_name;
            _this.myAccountData.password = "";
            _this.myAccountData.password_confirmation = "";
            _this.appUserService.updateUserInfo(data);
        });
    };
    //============================================================================================
    MyAccountPage.prototype.ionViewWillEnter = function () {
        this.myAccountData.first_name = this.appUserService.customerData.firstName;
        this.myAccountData.last_name = this.appUserService.customerData.lastName;
    };
    MyAccountPage.prototype.ngOnInit = function () {
    };
    MyAccountPage = __decorate([
        core_1.Component({
            selector: 'app-my-account',
            templateUrl: './my-account.page.html',
            styleUrls: ['./my-account.page.scss']
        })
    ], MyAccountPage);
    return MyAccountPage;
}());
exports.MyAccountPage = MyAccountPage;
