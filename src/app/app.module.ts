import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppAlertService } from 'src/services/app-alert/app-alert.service';
import { AppAnimationsService } from 'src/services/app-animations/app-animations.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppNetworkService } from 'src/services/app-network/app-network.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppRecentProductsService } from 'src/services/app-recentproducts/app-recent-products.service';
import { AppStorageService } from 'src/services/app-storage/app-storage.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { AuthGuardService } from 'src/services/auth-guard/auth-guard.service';
import { BackButtonExitAppService } from 'src/services/back-button-exit/back-button-exit-app.service';
import { ConfigService } from 'src/services/config/config.service';
import { FirebasePhoneAuthService } from 'src/services/firebase-phone-auth/firebase-phone-auth.service';
import { GetDeviceIdService } from 'src/services/get-device-id/get-device-id.service';
import { GetIpAddressService } from 'src/services/get-ip-Address/get-ip-address.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP } from '@ionic-native/http/ngx';
import { AppLogPagePageModule } from './modals/app-log-page/app-log-page.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { BlankModalPageModule } from './modals/blank-modal/blank-modal.module';
import { CurrencyListPageModule } from './modals/currency-list/currency-list.module';
import { DemoSettingsPageModule } from './modals/demo-settings/demo-settings.module';
import { ForgotPasswordPageModule } from './modals/forgot-password/forgot-password.module';
import { LanguagePageModule } from './modals/language/language.module';
import { LoginPageModule } from './modals/login/login.module';
import { PhoneLoginPageModule } from './modals/phone-login/phone-login.module';
import { PrivacyPolicyPageModule } from './modals/privacy-policy/privacy-policy.module';
import { ProductAttributesModalPageModule } from './modals/product-attributes-modal/product-attributes-modal.module';
import { RefundPolicyPageModule } from './modals/refund-policy/refund-policy.module';
import { SelectCountryPageModule } from './modals/select-country/select-country.module';
import { SelectZonesPageModule } from './modals/select-zones/select-zones.module';
import { SignUpPageModule } from './modals/sign-up/sign-up.module';
import { TermServicesPageModule } from './modals/term-services/term-services.module';
// import { IntroPageModule } from './intro/intro.module';
import { AppSettingsModalPageModule } from './modals/app-settings-modal/app-settings-modal.module';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AboutUsPageModule } from './about-us/about-us.module';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { ContactUsContentPageModule } from './modals/contact-us-content/contact-us-content.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    AppLogPagePageModule,
    PipesModule,
    FormsModule,
    BlankModalPageModule,
    LanguagePageModule,
    RefundPolicyPageModule,
    AboutUsPageModule,
    CurrencyListPageModule,
    ContactUsContentPageModule,
    LoginPageModule,
    SignUpPageModule,
    ForgotPasswordPageModule,
    PrivacyPolicyPageModule,
    TermServicesPageModule,
    SelectCountryPageModule,
    SelectZonesPageModule,
    DemoSettingsPageModule,
    PhoneLoginPageModule,
    ProductAttributesModalPageModule,
    // IntroPageModule,
    AppSettingsModalPageModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule
  ],
  providers: [
    ConfigService,
    AppHttpService,
    SharedDataService,
    AppLogService,
    AppStorageService,
    AppUserService,
    AppOrderService,
    AppCartService,
    AppTranslationService,
    AppToastService,
    AppAlertService,
    AppWishListService,
    AppRecentProductsService,
    AppNetworkService,
    NativeGeocoder,
    GetDeviceIdService,
    GetIpAddressService,
    NetworkInterface,
    AuthGuardService,
    BackButtonExitAppService,
    FirebasePhoneAuthService,
    AppAnimationsService,
    HTTP,
    PhotoViewer,
    Facebook,
    GooglePlus,
    OneSignal,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
