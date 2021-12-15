import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppRecentProductsService } from 'src/services/app-recentproducts/app-recent-products.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { ConfigService } from 'src/services/config/config.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-demo-settings',
  templateUrl: './demo-settings.page.html',
  styleUrls: ['./demo-settings.page.scss'],
})


export class DemoSettingsPage implements OnInit {
  colors = [
    { value: '#3E5902', name: 'default' },
    //{ value: '#ffffff', name: 'white' },
    { value: '#EC3F34', name: 'green' },
    { value: '#BF04A0', name: 'red' },
    { value: '#FCAD8E', name: 'magnesium' },
    { value: '#FF8EA6', name: 'salmon' },
    { value: '#44B3FF', name: 'plum' },
    { value: '#9546FE', name: 'blue' },
    { value: '#A6633C', name: 'pink' },
    { value: '#3CA68D', name: 'orange' },
    { value: '#3C51A6', name: 'maroon' },
    { value: '#726DFF', name: 'cayanne' },
    { value: '#FF6D6D', name: 'sea' },
    { value: '#B3182A', name: 'theme15' },
    { value: '#3980ff', name: 'theme16' },
    { value: '#483A6F', name: 'theme17' },
    { value: '#621529', name: 'theme18' },
    // { value: '#76d6ff', name: 'sky' },
    // { value: '#9437ff', name: 'grape' },
  ]
  //#000000, #EC3F34, #BF04A0, #FCAD8E, #FF8EA6, #44B3FF, #9546FE, #A6633C, #3CA68D, #, #, #
  translate;
  themeMode: any = 'dark';
  loaderLanguages = true;
  loaderCurrecny = true;

  banner = "1";
  constructor(
    public loading: LoadingService,
    public modalCont: ModalController,
    public config: ConfigService,
    public appCartService: AppCartService,
    public nav: NavController,
    public appHttpService: AppHttpService,
    public shared: SharedDataService,
    public appWishListService: AppWishListService,
    public appRecentProductsService: AppRecentProductsService,
    public appLogService: AppLogService) {
    this.getLanguages();
    this.getListOfCurrency();


    if (this.config.darkModeBool) {
      this.themeMode = 'dark'
    }
    else {
      this.themeMode = 'light'
    }

    //this.banner = this.config.bannerStyle;

    console.log(this.config.darkModeBool, this.themeMode);
  }
  modeChange() {
    if (this.themeMode == 'dark') {
      this.config.enableDarkMode(true);
    }
    else {
      this.config.enableDarkMode(false);
    }
  }

  setBannerStyle(banner) {
    // this.config.setBannerStyle(banner);
    // this.config.bannerStyle = banner
  }
  setCardStyle(card) {
    this.config.productCardStyleNumber = card;
    this.dismiss();
  }
  setCategoryStyle(s) {
    this.config.categoryPageNumber = s
    this.dismiss();
  }
  setHomeStyle(s) {
    this.config.homePageNumber = s
    this.dismiss();
  }
  //close modal
  dismiss() {
    this.modalCont.dismiss();
  }

  ngOnInit() {
  }
  changeAppTheme(value) {
    this.config.appThemeString = value;
  }
  //================================================================
  public languagesArray = [];
  selectedLanguage;
  getLanguages() {
    //getting all languages
    this.appHttpService.getHttp('language?page=1&limit=100').then((data: any) => {
      this.loaderLanguages = false
      this.languagesArray = data;
      for (let data of this.languagesArray) {
        if (data.id == this.config.languageIdNumber) {
          this.selectedLanguage = data;
        }
      }
    });
  }
  updateLanguage(lang) {
    if (lang != undefined && this.config.languageIdNumber != lang.id) {
      this.loading.show();
      localStorage.languageIdNumber = lang.id;
      localStorage.languageCodeString = lang.code;
      localStorage.appDirectionString = lang.direction;
      //this.appCartService.emptyCart();
      //this.appRecentProductsService.emptyRecentViewed();
      setTimeout(() => {
        window.location.reload();
        this.loading.hide();
      }, 900);
    }
  }
  //===============================================================

  selectedCurrency: any;
  currencyListArray = [];

  getListOfCurrency() {
    this.appHttpService.getHttp('currency').then((data: any) => {
      this.currencyListArray = data;
      this.loaderCurrecny = false
      this.currencyListArray.forEach(val => {
        if (this.config.currencyIdNumber == val.currency_id)
          this.selectedCurrency = val;
      });
    });
  }

  updateCurrency(value) {

    if (value != undefined && this.config.currencyIdNumber != value.currency_id) {
      this.loading.show()
      localStorage.currencyIdNumber = value.currency_id
      localStorage.currencyCodeString = value.title
      localStorage.currencySymbolString = value.code
      localStorage.currencyPositionString = value.symbol_position
      localStorage.currencyDecimalNumber = value.decimal_place
      console.log(value)

      //this.appCartService.emptyCart();
      //this.appRecentProductsService.emptyRecentViewed();
      setTimeout(() => {
        window.location.reload()
        this.loading.hide()
      }, 900)
    }
  }
}
