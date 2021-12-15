import { Injectable } from '@angular/core'
import { AppStorageService } from '../app-storage/app-storage.service'
import { AppEventsService } from '../app-events/app-events.service'
import { AppHttpService } from '../app-http/app-http.service'
import { AppRecentProductsService } from '../app-recentproducts/app-recent-products.service'
import { AppTranslationService } from '../app-translation/app-translation.service'
import { AppUserService } from '../app-user/app-user.service'
import { ConfigService } from '../config/config.service'
import { SharedDataService } from '../shared-data/shared-data.service'
import firebase from 'firebase/app'
import { ModalController } from '@ionic/angular'
// import { IntroPage } from 'src/app/intro/intro.page'
import { AppCategoriesService } from '../app-categories/app-categories.service'
import { AppWishListService } from '../app-wishlist/app-wish-list.service'
import { AppNetworkService } from '../app-network/app-network.service'
@Injectable({
  providedIn: 'root'
})
export class AppOnStartService {

  constructor(
    public storage: AppStorageService,
    public modalCtrl: ModalController,
    public appHttp: AppHttpService,
    public config: ConfigService,
    public shared: SharedDataService,
    public appEventsService: AppEventsService,
    public appTranslationService: AppTranslationService,
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public appRecentProductsService: AppRecentProductsService,
    public appCategoriesService: AppCategoriesService,
    public appWishListService: AppWishListService,
    public appNetworkService: AppNetworkService,
  ) {
  }
  //============================================================================
  getSettingsFromServer() {
    return this.appHttp.getHttp('setting?app_setting=1')
  }
  //============================================================================ 
  loadAppSetting() {
    return new Promise(resolve => {
      this.storage.get('appSettings').then((val) => {
        if (val == null) {
          this.getSettingsFromServer().then((response: any) => {
            let appSettings = {}
            appSettings = response
            this.onSettingsLoaded(appSettings)
            resolve(appSettings)
          });
        }
        else {
          let appSettings = val
          this.onSettingsLoaded(appSettings)
          resolve(appSettings)
        }
      });
    });
  }


  //============================================================================
  //initalizing app after getting data from the server or local storage
  onSettingsLoaded(data) {
    // this.openIntroPage()
    this.storage.set("appSettings", data)
    this.config.defaultSettings(data)
    this.settingDirectionOfApp()
    this.loadAppTranslation()
    this.getBanners()
    this.getCategories()
    if (this.appUserService.whoIsUser() == 'customer') this.appWishListService.getWishListProducts()
    //this.getPages()
    //this.appRecentProductsService.getRecentProducts()
    //firebase.initializeApp(this.config.firebaseConfig)
    this.checkingNewSettingsFromServer()
  }

  // openIntroPage() {
  //   this.storage.get('firsttimeApp').then(async (val) => {
  //     console.log("firsttimeApp", val)
  //     if (this.config.showIntroPageBool && val == null) {
  //       this.storage.set('firsttimeApp', 'firstTime');
  //       let modal = await this.modalCtrl.create({
  //         component: IntroPage,
  //       });
  //       return modal.present();
  //     }
  //   });
  // }
  //============================================================================
  settingDirectionOfApp() {
    //setting direction of the application
    document.documentElement.dir = this.config.appDirectionString
  }
  //============================================================================
  loadAppTranslation() {
    let url = 'assets/i18n/' + this.config.languageCodeString + ".json"
    this.appHttpService.angularHttpGet(url).then((data: any) => {

      let tempdata: { [k: string]: any } = {};
      Object.keys(data).forEach(key => {
        let value = data[key];
        let k = key.toLocaleLowerCase()
        tempdata[k] = value
      });

      this.appTranslationService.translationListArray = tempdata
    });
  }
  //============================================================================
  getBanners() {
    //getting all banners
    this.appHttpService.getHttp('banner?getBannerNavigation=1&getBannerMedia=1').then((data: any) => {
      this.shared.bannersArray = data
    })
  }
  getNewestProducts() {
    let url = "products"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"

    this.appHttpService.getHttp(url).then((data: any) => {
      this.shared.tab1Array = data
    })
  }
  //============================================================================
  getCategories(page = 1) {
    let pageLimit = 100
    let url = 'category'
    url += "?page=" + 1
    url += "&getDetail=" + 1
    url += "&limit=" + pageLimit
    url += "&getMedia=" + 1
    url += "&language_id=" + this.config.languageIdNumber

    //getting all allCategories
    this.appHttpService.getHttp(url).then((data: any) => {
      let resoponse = data
      if (resoponse.length == pageLimit) this.getCategories(++page)
      this.appCategoriesService.sortCategories(resoponse)

    });

  }
  //============================================================================
  getPages() {
    //getting tab 1
    let data: { [k: string]: any } = {}
    if (this.appUserService.customerData.customers_id != null)
      data.customers_id = this.appUserService.customerData.customers_id
    data.page_number = 0
    data.language_id = this.config.languageIdNumber
    data.currency_code = this.config.currencyCodeString

    //getting allpages from the server
    this.appHttpService.postHttp('getallpages', data).then((data: any) => {
      if (data.success == 1) {
        let pages = data.pages_data
        for (let value of pages) {
          if (value.slug == 'privacy-policy') this.shared.privacyPolicy = value.description;
          if (value.slug == 'term-services') this.shared.termServices = value.description;
          if (value.slug == 'refund-policy') this.shared.refundPolicy = value.description;
          if (value.slug == 'about-us') this.shared.aboutUs = value.description;
        }
      }
    });
  }
  //============================================================================
  checkingNewSettingsFromServer() {
    this.getSettingsFromServer().then((data: any) => {
      if (data.success == "1") {
        let settings = data;
        this.storage.set("appSettings", settings)
      }
    });
  }
}
