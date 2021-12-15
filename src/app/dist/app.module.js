"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var ngx_1 = require("@ionic-native/native-geocoder/ngx");
var ngx_2 = require("@ionic-native/network-interface/ngx");
var angular_1 = require("@ionic/angular");
var app_alert_service_1 = require("src/services/app-alert/app-alert.service");
var app_animations_service_1 = require("src/services/app-animations/app-animations.service");
var app_cart_service_1 = require("src/services/app-cart/app-cart.service");
var app_http_service_1 = require("src/services/app-http/app-http.service");
var app_log_service_1 = require("src/services/app-log/app-log.service");
var app_network_service_1 = require("src/services/app-network/app-network.service");
var app_order_service_1 = require("src/services/app-order/app-order.service");
var app_recent_products_service_1 = require("src/services/app-recentproducts/app-recent-products.service");
var app_storage_service_1 = require("src/services/app-storage/app-storage.service");
var app_toast_service_1 = require("src/services/app-toast/app-toast.service");
var app_translation_service_1 = require("src/services/app-translation/app-translation.service");
var app_user_service_1 = require("src/services/app-user/app-user.service");
var app_wish_list_service_1 = require("src/services/app-wishlist/app-wish-list.service");
var auth_guard_service_1 = require("src/services/auth-guard/auth-guard.service");
var back_button_exit_app_service_1 = require("src/services/back-button-exit/back-button-exit-app.service");
var config_service_1 = require("src/services/config/config.service");
var firebase_phone_auth_service_1 = require("src/services/firebase-phone-auth/firebase-phone-auth.service");
var get_device_id_service_1 = require("src/services/get-device-id/get-device-id.service");
var get_ip_address_service_1 = require("src/services/get-ip-Address/get-ip-address.service");
var shared_data_service_1 = require("src/services/shared-data/shared-data.service");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var ngx_3 = require("@ionic-native/http/ngx");
var app_log_page_module_1 = require("./modals/app-log-page/app-log-page.module");
var pipes_module_1 = require("src/pipes/pipes.module");
var forms_1 = require("@angular/forms");
var blank_modal_module_1 = require("./modals/blank-modal/blank-modal.module");
var currency_list_module_1 = require("./modals/currency-list/currency-list.module");
var demo_settings_module_1 = require("./modals/demo-settings/demo-settings.module");
var forgot_password_module_1 = require("./modals/forgot-password/forgot-password.module");
var language_module_1 = require("./modals/language/language.module");
var login_module_1 = require("./modals/login/login.module");
var phone_login_module_1 = require("./modals/phone-login/phone-login.module");
var privacy_policy_module_1 = require("./modals/privacy-policy/privacy-policy.module");
var product_attributes_modal_module_1 = require("./modals/product-attributes-modal/product-attributes-modal.module");
var refund_policy_module_1 = require("./modals/refund-policy/refund-policy.module");
var select_country_module_1 = require("./modals/select-country/select-country.module");
var select_zones_module_1 = require("./modals/select-zones/select-zones.module");
var sign_up_module_1 = require("./modals/sign-up/sign-up.module");
var term_services_module_1 = require("./modals/term-services/term-services.module");
var intro_module_1 = require("./intro/intro.module");
var app_settings_modal_module_1 = require("./modals/app-settings-modal/app-settings-modal.module");
var ngx_4 = require("@ionic-native/photo-viewer/ngx");
var ngx_5 = require("@ionic-native/facebook/ngx");
var ngx_6 = require("@ionic-native/google-plus/ngx");
var ngx_7 = require("@ionic-native/onesignal/ngx");
var about_us_module_1 = require("./about-us/about-us.module");
var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");
var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                angular_1.IonicModule.forRoot({
                    mode: 'md'
                }),
                app_routing_module_1.AppRoutingModule,
                app_log_page_module_1.AppLogPagePageModule,
                pipes_module_1.PipesModule,
                forms_1.FormsModule,
                blank_modal_module_1.BlankModalPageModule,
                language_module_1.LanguagePageModule,
                refund_policy_module_1.RefundPolicyPageModule,
                about_us_module_1.AboutUsPageModule,
                currency_list_module_1.CurrencyListPageModule,
                login_module_1.LoginPageModule,
                sign_up_module_1.SignUpPageModule,
                forgot_password_module_1.ForgotPasswordPageModule,
                privacy_policy_module_1.PrivacyPolicyPageModule,
                term_services_module_1.TermServicesPageModule,
                select_country_module_1.SelectCountryPageModule,
                select_zones_module_1.SelectZonesPageModule,
                demo_settings_module_1.DemoSettingsPageModule,
                phone_login_module_1.PhoneLoginPageModule,
                product_attributes_modal_module_1.ProductAttributesModalPageModule,
                intro_module_1.IntroPageModule,
                app_settings_modal_module_1.AppSettingsModalPageModule,
                animationDirective_module_1.AnimationDirectiveModule,
                imageValidate_module_1.ImageValidateDirectiveModule
            ],
            providers: [
                config_service_1.ConfigService,
                app_http_service_1.AppHttpService,
                shared_data_service_1.SharedDataService,
                app_log_service_1.AppLogService,
                app_storage_service_1.AppStorageService,
                app_user_service_1.AppUserService,
                app_order_service_1.AppOrderService,
                app_cart_service_1.AppCartService,
                app_translation_service_1.AppTranslationService,
                app_toast_service_1.AppToastService,
                app_alert_service_1.AppAlertService,
                app_wish_list_service_1.AppWishListService,
                app_recent_products_service_1.AppRecentProductsService,
                app_network_service_1.AppNetworkService,
                ngx_1.NativeGeocoder,
                get_device_id_service_1.GetDeviceIdService,
                get_ip_address_service_1.GetIpAddressService,
                ngx_2.NetworkInterface,
                auth_guard_service_1.AuthGuardService,
                back_button_exit_app_service_1.BackButtonExitAppService,
                firebase_phone_auth_service_1.FirebasePhoneAuthService,
                app_animations_service_1.AppAnimationsService,
                ngx_3.HTTP,
                ngx_4.PhotoViewer,
                ngx_5.Facebook,
                ngx_6.GooglePlus,
                ngx_7.OneSignal,
                {
                    provide: router_1.RouteReuseStrategy,
                    useClass: angular_1.IonicRouteStrategy
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
