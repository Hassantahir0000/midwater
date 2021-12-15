"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppUserService = void 0;
var core_1 = require("@angular/core");
var AppUserService = /** @class */ (function () {
    function AppUserService(storage, loading, 
    //public appPushNotificationService: AppPushNotificationService,
    appLogService, appEventsService, appToastService, config) {
        this.storage = storage;
        this.loading = loading;
        this.appLogService = appLogService;
        this.appEventsService = appEventsService;
        this.appToastService = appToastService;
        this.config = config;
        this.customerData = {};
        this.guestSessionString = "";
        this.initalizeCustomerData();
    }
    AppUserService.prototype.initalizeCustomerData = function () {
        //getting logged in customer data 
        // this.storage.get('customerData').then((val) => {
        //   if (val != null || val != undefined)
        //     this.login(val)
        // })
        //console.log(localStorage.customerData)
        if (localStorage.customerData == undefined || localStorage.customerData == 'undefined') { }
        else
            this.login(JSON.parse(localStorage.customerData));
    };
    AppUserService.prototype.login = function (data) {
        this.customerData.id = data.id;
        this.customerData.firstName = data.first_name;
        this.customerData.lastName = data.last_name;
        this.customerData.email = data.email;
        this.customerData.token = data.token;
        localStorage.customerData = JSON.stringify(data);
        console.log(this.customerData);
        this.appEventsService.publish('userLogin', "");
        this.setGuestSession("");
        //this.storage.set('customerData', data)
    };
    AppUserService.prototype.updateUserInfo = function (newData) {
        var oldData = JSON.parse(localStorage.customerData);
        this.customerData.firstName = oldData.first_name = newData.customer_first_name;
        this.customerData.lastName = oldData.last_name = newData.customer_last_name;
        this.customerData.email = oldData.email = newData.customer_email;
        localStorage.customerData = JSON.stringify(oldData);
    };
    AppUserService.prototype.logOut = function () {
        this.removeCustomerData();
        this.appEventsService.publish('userLogout', "");
        // this.fb.logout()
    };
    AppUserService.prototype.removeCustomerData = function () {
        this.customerData = {};
        localStorage.customerData = undefined;
        //this.storage.set('customerData', this.customerData)
    };
    AppUserService.prototype.getGuestSession = function () {
        return this.guestSessionString;
    };
    AppUserService.prototype.checkIfGuestSessionIsAvailable = function () {
        if (this.guestSessionString != "")
            return true;
        else
            return false;
    };
    AppUserService.prototype.setGuestSession = function (value) {
        this.guestSessionString = value;
    };
    AppUserService.prototype.whoIsUser = function () {
        var result = "";
        if (this.customerData.id == undefined)
            result = "guest";
        else
            result = "customer";
        return result;
    };
    AppUserService.prototype.getCustomerToken = function () {
        return this.customerData.token;
    };
    AppUserService.prototype.userIsLogedIn = function () {
        if (this.whoIsUser() == "customer")
            return true;
        else
            return false;
    };
    AppUserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppUserService);
    return AppUserService;
}());
exports.AppUserService = AppUserService;
