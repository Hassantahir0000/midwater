"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppHttpService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AppHttpService = /** @class */ (function () {
    function AppHttpService(appEventsService, getIpAddressService, getDeviceIdService, config, platform, appLogService, appToastService, angularHttp, httpNative, loading, appUserService) {
        this.appEventsService = appEventsService;
        this.getIpAddressService = getIpAddressService;
        this.getDeviceIdService = getDeviceIdService;
        this.config = config;
        this.platform = platform;
        this.appLogService = appLogService;
        this.appToastService = appToastService;
        this.angularHttp = angularHttp;
        this.httpNative = httpNative;
        this.loading = loading;
        this.appUserService = appUserService;
    }
    //============================================================================
    AppHttpService.prototype.onReceiveError200 = function (type, requestUrl, postData, response) {
        if (postData === void 0) { postData = {}; }
        var info = "Error : Http : " + type + " : ";
        this.appLogService.log(info + requestUrl, postData, response);
        //this.appToastService.toastError(info + requestUrl, response)
        this.appToastService.toastError(response.message);
        console.log(info + requestUrl, postData, response);
    };
    //============================================================================
    AppHttpService.prototype.onReceiveSuccess = function (type, requestUrl, postData, response) {
        if (postData === void 0) { postData = {}; }
        var info = "Response : Http : " + type + " : ";
        this.appLogService.log(info + requestUrl, postData, response);
        //console.log(info + requestUrl, response)
    };
    //============================================================================
    AppHttpService.prototype.onReceiveErrorNot200 = function (type, requestUrl, postData, response) {
        if (postData === void 0) { postData = {}; }
        var info = "Error : Http : " + type + " : ";
        console.log(info + requestUrl, postData, response);
        this.appLogService.log(info + requestUrl, postData, response);
        //this.appToastService.toastError(info + requestUrl)
        this.appToastService.toastError(response.error.message);
    };
    //======================================================
    AppHttpService.prototype.compareStrings = function (s1, s2) {
        if (s1.toLocaleLowerCase() == s2.toLocaleLowerCase())
            return true;
        else
            return false;
    };
    //===================================================== Get Request ===================================
    AppHttpService.prototype.getHeadersForHttp = function () {
        var headers = {
            'Content-Type': 'application/json',
            'clientid': this.config.clientIdString,
            'clientsecret': this.config.clientSecretString
        };
        if (this.appUserService.whoIsUser() == "customer") {
            var Authorization = "Bearer " + this.appUserService.getCustomerToken();
            headers = Object.assign({ Authorization: Authorization }, headers);
        }
        return headers;
    };
    AppHttpService.prototype.getHttp = function (req, loader, showAlert) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        if (showAlert === void 0) { showAlert = false; }
        var customHeaders = this.getHeadersForHttp();
        var httpOptions = {
            headers: new http_1.HttpHeaders(customHeaders)
        };
        return new Promise(function (resolve) {
            if (loader)
                _this.loading.show();
            if (_this.platform.is('cordova')) {
                _this.httpNative.get(_this.config.urlString + req, {}, customHeaders)
                    .then(function (data) {
                    var response = JSON.parse(data.data);
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("Get", req, {}, response.message);
                        if (showAlert)
                            _this.appToastService.toastErrorWithCloseButton(response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("Get", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("Get", req, {}, response.data);
                        resolve(response.data);
                    }
                    if (loader)
                        _this.loading.hide();
                })["catch"](function (error) {
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("Get", req, {}, error);
                });
            }
            else {
                _this.angularHttp.get(_this.config.urlString + req, httpOptions).subscribe(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = data;
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("Get", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("Get", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("Get", req, {}, response.data);
                        resolve(response.data);
                    }
                    if (loader)
                        _this.loading.hide();
                }, function (error) {
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("Get", req, {}, error);
                });
            }
        });
    };
    //================================================ Post Request ===============================================
    AppHttpService.prototype.postHttp = function (req, postData, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        var customHeaders = this.getHeadersForHttp();
        var httpOptions = {
            headers: new http_1.HttpHeaders(customHeaders)
        };
        return new Promise(function (resolve) {
            if (loader)
                _this.loading.show();
            if (_this.platform.is('cordova')) {
                _this.httpNative.setDataSerializer("json");
                _this.httpNative.clearCookies();
                _this.httpNative.post(_this.config.urlString + req, postData, customHeaders)
                    .then(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = JSON.parse(data.data);
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("POST", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("POST", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("POST", req, postData, response.data);
                        resolve(response.data);
                    }
                })["catch"](function (error) {
                    console.log(error);
                    var er = JSON.parse(error.error);
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("POST", req, postData, { error: er });
                });
            }
            else {
                _this.angularHttp.post(_this.config.urlString + req, postData, httpOptions).subscribe(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = data;
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("POST", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("POST", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("POST", req, postData, response.data);
                        resolve(response.data);
                    }
                }, function (error) {
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("POST", req, postData, error);
                });
            }
        });
    };
    //================================================ Post Request ===============================================
    AppHttpService.prototype.putHttp = function (req, postData, loader, showAlert) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        if (showAlert === void 0) { showAlert = false; }
        var customHeaders = this.getHeadersForHttp();
        var httpOptions = {
            headers: new http_1.HttpHeaders(customHeaders)
        };
        return new Promise(function (resolve) {
            if (loader)
                _this.loading.show();
            if (_this.platform.is('cordova')) {
                _this.httpNative.setDataSerializer("json");
                _this.httpNative.clearCookies();
                _this.httpNative.put(_this.config.urlString + req, postData, customHeaders)
                    .then(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = JSON.parse(data.data);
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("PUT", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("PUT", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("PUT", req, postData, response.data);
                        if (showAlert)
                            _this.appToastService.toastMiddle(response.message);
                        resolve(response.data);
                    }
                })["catch"](function (error) {
                    var er = JSON.parse(error.error);
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("PUT", req, postData, { error: er });
                });
            }
            else {
                _this.angularHttp.put(_this.config.urlString + req, postData, httpOptions).subscribe(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = data;
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("PUT", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("POST", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("PUT", req, postData, response.data);
                        if (showAlert)
                            _this.appToastService.toastMiddle(response.message);
                        resolve(response.data);
                    }
                }, function (error) {
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("PUT", req, postData, error);
                });
            }
        });
    };
    //================================================ delete Request ===============================================
    AppHttpService.prototype.deleteHttp = function (req, postData, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        var customHeaders = this.getHeadersForHttp();
        var httpOptions = {
            headers: new http_1.HttpHeaders(customHeaders)
        };
        return new Promise(function (resolve) {
            if (loader)
                _this.loading.show();
            if (_this.platform.is('cordova')) {
                var postDataa = {};
                for (var key in postData) {
                    var value = postData[key];
                    postDataa[key] = String(value);
                }
                _this.httpNative.setDataSerializer("json");
                _this.httpNative.clearCookies();
                _this.httpNative["delete"](_this.config.urlString + req, postDataa, customHeaders)
                    .then(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = JSON.parse(data.data);
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("DELETE", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("DELETE", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("DELETE", req, postData, response.data);
                        resolve(response.data);
                    }
                })["catch"](function (error) {
                    var er = JSON.parse(error.error);
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("DELETE", req, postData, { error: er });
                });
            }
            else {
                var options = { headers: customHeaders, params: postData };
                _this.angularHttp["delete"](_this.config.urlString + req, options).subscribe(function (data) {
                    if (loader)
                        _this.loading.hide();
                    var response = data;
                    if (_this.compareStrings(response.status, "Error")) {
                        _this.onReceiveError200("DELETE", req, postData, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Warning")) {
                        _this.onReceiveError200("DELETE", req, {}, response.message);
                    }
                    else if (_this.compareStrings(response.status, "Success")) {
                        _this.onReceiveSuccess("DELETE", req, postData, response.data);
                        resolve(response.data);
                    }
                }, function (error) {
                    if (loader)
                        _this.loading.hide();
                    _this.onReceiveErrorNot200("DELETE", req, postData, error);
                });
            }
        });
    };
    //=====================================================================
    AppHttpService.prototype.angularHttpGet = function (url) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.angularHttp.get(url).subscribe(function (data) {
                _this.onReceiveSuccess("GET", url, {}, data);
                resolve(data);
            }, function (error) {
                _this.onReceiveErrorNot200("GET", url, {}, error);
            });
        });
    };
    AppHttpService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppHttpService);
    return AppHttpService;
}());
exports.AppHttpService = AppHttpService;
