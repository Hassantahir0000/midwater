import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { LoadingService } from 'src/services/loading/loading.service';

import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoginPage } from '../modals/login/login.page';
import { PrivacyPolicyPage } from '../modals/privacy-policy/privacy-policy.page';
import { TermServicesPage } from '../modals/term-services/term-services.page';
import { RefundPolicyPage } from '../modals/refund-policy/refund-policy.page';
import { LanguagePage } from '../modals/language/language.page';
import { CurrencyListPage } from '../modals/currency-list/currency-list.page';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppLogPagePage } from '../modals/app-log-page/app-log-page.page';
import { AppStorageService } from 'src/services/app-storage/app-storage.service';
import { AppSettingsModalPage } from '../modals/app-settings-modal/app-settings-modal.page';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  setting: { [k: string]: any } = {};
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    private storage: AppStorageService,
    public loading: LoadingService,
    public appEventsService: AppEventsService,
    public shared: SharedDataService,
    //public iab: InAppBrowser,
    public plt: Platform,
    public appUserService: AppUserService,
    public appLogService: AppLogService,
    public appCartService: AppCartService
  ) {
  }

  async openSettingsModal() {
    let modal = await this.modalCtrl.create({
      component: AppSettingsModalPage,
    });
    return await modal.present();
  }
  changeDarkMode() {
    this.config.darkModeBool = this.setting.darkMode;
    this.updateSetting();
  }

  updateSetting() {
    console.log(this.setting);
    this.storage.set('setting', this.setting);
  }
  async openLoginPage() {
    let modal = await this.modalCtrl.create({
      component: LoginPage,
      componentProps: {
        'hideGuestLogin': true
      }
    });
    return await modal.present();
  }
  async openCurrencyPage() {
    let modal = await this.modalCtrl.create({
      component: CurrencyListPage,
    });
    return await modal.present();
  }
  logOut() {
    this.appUserService.logOut();
  }
  openAccountPage() {
    this.navCtrl.navigateForward("/my-account");
  }
  openSite() {
    this.loading.autoHide(2000);
    //this.iab.create(this.config.yourSiteUrlString, "blank");
  }
  //============================================================================================
  //turning on off local  notification
  onOffPushNotification() {
    // var dat: { [k: string]: any } = {};
    // dat.device_id = this.appPushNotificationService.pushNotificationId;
    // if (this.setting.notification == false) dat.is_notify = 0;
    // else dat.is_notify = 1;
    // this.appHttpService.postHttp('notify_me', dat).then((data: any) => {
    //   if (data.success == 1) {

    //     this.updateSetting();
    //   }
    // });
  };
  hideShowFooterMenu() {
    this.appEventsService.publish('setting', this.setting);
    this.updateSetting();
  }
  hideShowCartButton() {
    this.appEventsService.publish('setting', this.setting);
    this.updateSetting();
  }
  async showModal(value) {
    if (value == 'language') {
      let modal = await this.modalCtrl.create({
        component: LanguagePage
      });
      return await modal.present();
    }
    else if (value == 'privacyPolicy') {
      let modal = await this.modalCtrl.create({
        component: PrivacyPolicyPage
      });
      return await modal.present();
    }
    else if (value == 'termServices') {
      let modal = await this.modalCtrl.create({
        component: TermServicesPage
      });
      return await modal.present();
    }
    else {
      let modal = await this.modalCtrl.create({
        component: RefundPolicyPage
      });
      return await modal.present();
    }
  }
  ionViewWillEnter() {
    this.getStoredSettings();
  }

  getStoredSettings() {
    this.storage.get('setting').then((val) => {
      if (val != null || val != undefined) {
        this.setting = val;

      }
      else {
        this.setting.localNotification = true;
        this.setting.notification = true;
        this.setting.cartButton = true;
        this.setting.footer = true;
      }
      this.setting.darkMode = this.config.darkModeBool;
      //this.changeDarkMode();
    });
  }


  async rateUs() {
    if (this.config.currentPlatfromString == "ios") {
      await Browser.open({ url: this.config.iosStoreUrlString.toString() });
    }
    else {
      const info = await App.getInfo()
      await Browser.open({ url: "https://play.google.com/store/apps/details?id=" + info.id });
    }
    // this.loading.autoHide(2000);
    // if (this.plt.is('ios')) {
    //   this.iab.create(this.config.iosStoreUrlString.toString(), "_system");
    // } else if (this.plt.is('android')) {
    //   const info = await Device.getInfo();
    //   this.iab.create("https://play.google.com/store/apps/details?id=" + info.appId, "_system");
    // }
  }
  async share() {
    this.loading.autoHide(2000);
    if (this.config.currentPlatfromString == "ios") {
      let shareRet = await Share.share({
        title: this.config.appNameString,
        text: this.config.appNameString,
        url: this.config.iosStoreUrlString.toString(),
        dialogTitle: this.config.iosStoreUrlString.toString(),
      });
    } else {
      const deviceInfo = await App.getInfo();
      let shareRet = await Share.share({
        title: deviceInfo.name,
        text: deviceInfo.name,
        url: "https://play.google.com/store/apps/details?id=" + deviceInfo.id,
        dialogTitle: deviceInfo.name,
      });
    }
  }
  showOption(value) {
    // if (this.config.wishListPage && value == "wishListPage" && this.appUserService.customerData.customers_id != null) { return true; }
    // else if (this.config.editProfilePage && value == "editPage" && this.appUserService.customerData.customers_id != null) { return true; }
    // else if (value == "changePasswordPage" && this.appUserService.customerData.customers_id != null) { return true; }
    // else if (value == "address" && this.appUserService.customerData.customers_id != null) { return true; }
    // else if (this.config.myOrdersPage && value == "myOrdersPage" && this.appUserService.customerData.customers_id != null) { return true; }
    // else if (this.config.contactUsPage && value == "contactPage") { return true; }
    // else if (this.config.aboutUsPage && value == "aboutUsPage") { return true; }
    // else if (this.config.newsPage && value == "newsPage") { return true; }
    // else if (this.config.introPage && value == "introPage") { return true; }
    // else if (this.config.shareApp && value == "sharePage") { return true; }
    // else if (this.config.rateApp && value == "ratePage") { return true; }
    // else if (this.config.settingPage && value == "settingsPage") { return true; }
    //else
    return true;
  }
  openPage(value) {
    if (value == "share") this.share()
    else if (value == "rate") this.rateUs()
    else this.navCtrl.navigateForward('/' + value);
  }
  ngOnInit() {
  }
  async openLogPage() {
    let modal = await this.modalCtrl.create({
      component: AppLogPagePage
    });
    return await modal.present();
  }
  tapCounter = 0;

  public userTapHeader() {
    this.tapCounter++;
    if (this.tapCounter == 10) {
      this.openLogPage();
      this.tapCounter = 0;
    }
  }

}
