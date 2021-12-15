
import { Injectable } from "@angular/core"
import { Platform } from '@ionic/angular'
import { AppStorageService } from '../app-storage/app-storage.service'
import { AppLogService } from "../app-log/app-log.service"
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { OneSignal } from '@ionic-native/onesignal/ngx';

if (localStorage.darkModeBool == undefined) localStorage.darkModeBool = false
@Injectable()

export class ConfigService {


  public yourSiteUrlString: string = 'https://api.midwater.co'
  // public yourSiteUrlString: string = 'http://midwater.test'
  public clientIdString: string = "1234"
  public clientSecretString: string = "sk_1234"

  public urlString: string = this.yourSiteUrlString + '/api/client/'
  public imgThumbnailUrlString: string = this.yourSiteUrlString + "/gallary/thumbnail"
  public imgMediumUrlString: string = this.yourSiteUrlString + "/gallary/medium"
  public imgLargeUrlString: string = this.yourSiteUrlString + "/gallary/large"

  public dummyImageString: string = "assets/dumy.jpg"

  public showIntroPageBool: boolean = true //  0 to hide and 1 to show intro page
  public appInProductionBool: boolean = true //  0 to hide and 1 to show intro page
  public roundBordersBool: boolean = true //make elements border round

  //app theming
  public appThemeString: string = 'default'
  public darkModeBool: boolean = false

  // app info
  public appNameString: string = ''
  public iosStoreUrlString: string = ""

  // login page settings
  public enableFacebookLoginBool: boolean = false
  public enableGoogleLoginBool: boolean = false
  public enableEmailLoginBool: boolean = false
  public enableAddressMapBool: boolean = false
  public enablePhoneLoginBool: boolean = false
  public phoneAuthWithFirebaseBool: boolean = false

  // App Design Layout settings
  public homePageNumber: number = 0
  public bannerStyleNumber: number = 0
  public categoryPageNumber: number = 0
  public productCardStyleNumber: number = 0
  public productSlidesPerPageNumber: number = 2.1

  // App currency and language settings
  public languageCodeString: string = ""
  public languageIdNumber: number
  public currencyDecimalNumber: number = 2
  public currencyIdNumber: number
  public currencyCodeString: string = ""
  public currencyPositionString: string = ""
  public currencySymbolString: string
  public appDirectionString: string = ""

  // Initialize Firebase 
  public firebaseConfig: { [k: string]: any } = {}
  // google map key
  public googleMapApiString: string = ""

  // Push notification settings
  public onesignalAppIdString: string = ""
  public onesignalSenderIdString: string = ""
  // others
  public inventoryBool: boolean = false
  public perPageNumber: number = 10;

  public currentPlatfromString: string = "web";
  public animationDurationNumber = 700 // in milisecounds
  constructor(
    public storage: AppStorageService,
    public platform: Platform,
    public appLogService: AppLogService,
    public oneSignal: OneSignal
  ) {
    this.currentPlatfromString = Capacitor.getPlatform()
    this.setUserSettings()
    if (this.onesignalAppIdString != "") this.registerOneSignal()
  }
  registerOneSignal() {
    if (Capacitor.isNativePlatform()) {
      this.oneSignal.startInit(this.onesignalAppIdString, this.onesignalSenderIdString)
      this.oneSignal.endInit()
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });
    }
  }
  defaultSettings(settings) {
    let homePageNumber = 0;
    settings.forEach(element => {
      if (element.setting_key == "app_name") this.appNameString = element.setting_value
      else if (element.setting_key == "home_style") homePageNumber = this.getIntergerFromString(element.setting_value)
      else if (element.setting_key == "category_style") this.categoryPageNumber = this.getIntergerFromString(element.setting_value)
      else if (element.setting_key == "card_style") this.productCardStyleNumber = this.getIntergerFromString(element.setting_value)
      else if (element.setting_key == "banner_style") this.bannerStyleNumber = this.getIntergerFromString(element.setting_value)
      else if (element.setting_key == "ios_app_url") this.iosStoreUrlString = element.setting_value
      else if (element.setting_key == "google_login") this.enableGoogleLoginBool = (element.setting_value == "1") ? true : false
      else if (element.setting_key == "facebook_login") this.enableFacebookLoginBool = (element.setting_value == "1") ? true : false
      else if (element.setting_key == "phone_login") this.enablePhoneLoginBool = (element.setting_value == "1") ? true : false
      else if (element.setting_key == "email_login") this.enableEmailLoginBool = (element.setting_value == "1") ? true : false
      else if (element.setting_key == "inventory") this.inventoryBool = (element.setting_value == "1") ? true : false

      else if (element.setting_key == "language_id") this.languageIdNumber = parseInt(element.setting_value)
      else if (element.setting_key == "language_code") this.languageCodeString = element.setting_value.toLocaleLowerCase()
      else if (element.setting_key == "direction") this.appDirectionString = element.setting_value
      else if (element.setting_key == "currency_id") this.currencyIdNumber = parseInt(element.setting_value)
      else if (element.setting_key == "currency_code") this.currencyCodeString = element.setting_value
      else if (element.setting_key == "currency_pos") this.currencyPositionString = element.setting_value
      else if (element.setting_key == "currency_symbol") this.currencySymbolString = element.setting_value
      else if (element.setting_key == "currency_decimals") this.currencyDecimalNumber = parseInt(element.setting_value)
    })
    this.setLanguageAndCurrenyData();
    this.homePageNumber = homePageNumber
  }

  getIntergerFromString(value) {
    return parseInt((value).replace(/[^0-9]/g, ''))
  }

  setLanguageAndCurrenyData() {
    if (localStorage.languageCodeString == undefined) {
      localStorage.languageCodeString = this.languageCodeString
      localStorage.languageIdNumber = this.languageIdNumber
      localStorage.currencyDecimalNumber = this.currencyDecimalNumber
      localStorage.currencyIdNumber = this.currencyIdNumber
      localStorage.currencyCodeString = this.currencyCodeString
      localStorage.currencyPositionString = this.currencyPositionString
      localStorage.currencySymbolString = this.currencySymbolString
      localStorage.appDirectionString = this.appDirectionString
    }
    else {
      this.languageCodeString = localStorage.languageCodeString.toLocaleLowerCase()
      this.languageIdNumber = parseInt(localStorage.languageIdNumber)
      this.currencyDecimalNumber = parseInt(localStorage.currencyDecimalNumber)
      this.currencyIdNumber = parseInt(localStorage.currencyIdNumber)
      this.currencyCodeString = localStorage.currencyCodeString
      this.currencyPositionString = localStorage.currencyPositionString
      this.currencySymbolString = localStorage.currencySymbolString
      this.appDirectionString = localStorage.appDirectionString
    }

  }

  setUserSettings() {
    if (localStorage.darkModeBool == "true")
      this.enableDarkMode(true)
    else
      this.enableDarkMode(false)
  }

  enableDarkMode(bool) {
    this.darkModeBool = bool
    this.changeStatusBarColor()
    if (bool) localStorage.darkModeBool = "true"
    else localStorage.darkModeBool = "false"
  }

  changeStatusBarColor() {
    if (Capacitor.isNativePlatform()) {
      if (this.darkModeBool) {
        StatusBar.setStyle({ style: Style.Dark })
        StatusBar.setBackgroundColor({ color: "#000000" })
      }
      else {
        StatusBar.setStyle({ style: Style.Light })
        StatusBar.setBackgroundColor({ color: "#ffffff" })
      }
    }
  }

  transformCurrency(value) {
    let currency = this.currencySymbolString;
    let decimals = this.currencyDecimalNumber;
    let currecnyPos = this.currencyPositionString;

    let priceFixed = parseFloat(value).toFixed(decimals);
    //let priceFixed = value;

    if (priceFixed.toString() == 'NaN') {

      if (currecnyPos == 'left')
        return currency + "" + value;
      else
        return value + " " + currency;
    }
    else {
      if (currecnyPos == 'left')
        return currency + "" + priceFixed;
      else
        return priceFixed + "" + currency;
    }
  }
}