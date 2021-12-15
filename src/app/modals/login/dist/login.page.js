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
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var forgot_password_page_1 = require("../forgot-password/forgot-password.page");
var core_2 = require("@capacitor/core");
var LoginPage = /** @class */ (function () {
    function LoginPage(config, modalCtrl, loading, appCartService, shared, navCtrl, appEventsService, navParams, appHttpService, appToastService, appAlertService, appUserService, fb, googlePlus) {
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.appCartService = appCartService;
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.appEventsService = appEventsService;
        this.navParams = navParams;
        this.appHttpService = appHttpService;
        this.appToastService = appToastService;
        this.appAlertService = appAlertService;
        this.appUserService = appUserService;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.formData = { email: '', password: '' };
        this.signUpformData = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            confirm_password: '',
            status: 1
        };
        this.errorMessage = '';
        this.topSegmentsString = "signIn";
        this.hideGuestLogin = navParams.get('hideGuestLogin');
        this.shared.currentOpenedModel = this;
    }
    LoginPage.prototype.openForgetPasswordPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: forgot_password_page_1.ForgotPasswordPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var info = this.formData;
        if (this.appUserService.checkIfGuestSessionIsAvailable()) {
            info = Object.assign({ session_id: this.appUserService.getGuestSession() }, info);
        }
        this.appHttpService.postHttp('customer_login', info, true).then(function (data) {
            _this.appUserService.login(data);
            _this.dismiss();
        });
    };
    LoginPage.prototype.signUp = function () {
        var _this = this;
        var info = this.signUpformData;
        if (this.appUserService.checkIfGuestSessionIsAvailable()) {
            info = Object.assign({ session_id: this.appUserService.getGuestSession() }, info);
        }
        this.appHttpService.postHttp('customer_register', info, true).then(function (data) {
            _this.appUserService.login(data);
            _this.dismiss();
        });
    };
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connected') {
                console.log("user connected already" + res.authResponse.accessToken);
                _this.createAccount(res.authResponse.accessToken, 'fb');
            }
            else {
                console.log("USer Not login ");
                _this.fb.login(['public_profile', 'email'])
                    .then(function (res) {
                    // this.alert.show('Logged into Facebook!' + JSON.stringify(res));
                    console.log("successfully login ");
                    _this.createAccount(res.authResponse.accessToken, 'fb');
                })["catch"](function (e) { return _this.appAlertService.showAlert('Error logging into Facebook' + JSON.stringify(e)); });
            }
        })["catch"](function (e) { return _this.appAlertService.showAlert('Error Check Login Status Facebook' + JSON.stringify(e)); });
    };
    LoginPage.prototype.openAppleSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var SignInWithApple;
            var _this = this;
            return __generator(this, function (_a) {
                SignInWithApple = core_2.Plugins.SignInWithApple;
                SignInWithApple.Authorize()
                    .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (res.response && res.response.identityToken) {
                            this.createAccount(res.response, 'apple');
                            this.appAlertService.showAlert(JSON.stringify(res.response));
                        }
                        else {
                            this.presentAlert();
                        }
                        return [2 /*return*/];
                    });
                }); })["catch"](function (response) {
                    _this.presentAlert();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.presentAlert = function () {
        this.appAlertService.showAlertWithTitle("Please try again later", "Login Failed");
    };
    LoginPage.prototype.googleLogin = function () {
        var _this = this;
        this.loading.autoHide(500);
        this.googlePlus.login({})
            .then(function (res) {
            //  alert(JSON.stringify(res))
            _this.createAccount(res, 'google');
        })["catch"](function (err) { return _this.appAlertService.showAlert(JSON.stringify(err)); });
    };
    //============================================================================================  
    //creating new account using function facebook or google details 
    LoginPage.prototype.createAccount = function (info, type) {
        var _this = this;
        // alert(info);
        var dat = {};
        var url = '';
        if (type == 'fb') {
            url = 'facebookregistration';
            dat.access_token = info;
        }
        else if (type == 'phone') {
            url = 'phoneregistration';
            dat.phone = info;
        }
        else {
            url = 'googleregistration';
            dat = info;
        }
        this.appHttpService.postHttp(url, dat, true).then(function (data) {
            // alert("data get");
            if (data.success == 1) {
                _this.appUserService.login(data.data[0]);
                //alert('login');
                // this.shared.showAlertWithTitle("<h3>Your Account has been created successfully !</h3><ul><li>Your Email: "
                //   + "<span>" + this.shared.customerData.email + "</span>" + "</li><li>Your Password: "
                //   + "<span>" + this.shared.customerData.password + "</span>" +
                //   " </li></ul><p>You can login using this Email and Password.<br>You can change your password in Menu -> My Account</p>", "Account Information");
                //  $ionicSideMenuDelegate.toggleLeft();
                _this.appToastService.toast(data.message);
                _this.dismiss();
            }
            else if (data.success == 2) {
                _this.appUserService.login(data.data[0]);
                //  alert("login with alreday");
                _this.appToastService.toast(data.message);
                _this.dismiss();
            }
        }, function (error) {
            _this.loading.hide();
            _this.appAlertService.showAlert("error " + JSON.stringify(error));
            // console.log("error " + JSON.stringify(error));
        });
    };
    ;
    //close modal
    LoginPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss']
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
