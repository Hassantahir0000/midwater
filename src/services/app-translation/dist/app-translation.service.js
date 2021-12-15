"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppTranslationService = void 0;
var core_1 = require("@angular/core");
var AppTranslationService = /** @class */ (function () {
    function AppTranslationService(config, appLogService, appStorageService) {
        this.config = config;
        this.appLogService = appLogService;
        this.appStorageService = appStorageService;
        this.translationListArray = {};
        this.missingValues = {};
        if (localStorage.missingValues)
            this.missingValues = JSON.parse(localStorage.missingValues);
    }
    AppTranslationService.prototype.consoleMissingValues = function () {
        console.log(this.missingValues);
    };
    // translation services
    AppTranslationService.prototype.translateStringPipe = function (value) {
        return this.getTranslationFromArray(value);
    };
    AppTranslationService.prototype.getTranslationFromArray = function (val) {
        var key = val.toLocaleLowerCase();
        var v = this.translationListArray[key];
        if (v == undefined) {
            this.missingValues[key] = key;
            v = key;
        }
        localStorage.missingValues = JSON.stringify(this.missingValues);
        return v;
    };
    // translation services
    AppTranslationService.prototype.translateString = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.getTranslationFromArray(value));
        });
    };
    AppTranslationService.prototype.translateArray = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            var tempArray = [];
            value.forEach(function (element) {
                tempArray[element] = _this.getTranslationFromArray(element);
            });
            resolve(tempArray);
        });
    };
    AppTranslationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppTranslationService);
    return AppTranslationService;
}());
exports.AppTranslationService = AppTranslationService;
