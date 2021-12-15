import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/services/loading/loading.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ModalController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { AppRecentProductsService } from 'src/services/app-recentproducts/app-recent-products.service';
import { AppLogService } from 'src/services/app-log/app-log.service';


@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.page.html',
  styleUrls: ['./currency-list.page.scss'],
})
export class CurrencyListPage implements OnInit {

  selectedCurrency: any;
  currencyListArray = [];
  constructor(
    public loading: LoadingService,
    public config: ConfigService,
    public shared: SharedDataService,
    public appCartService: AppCartService,
    public modalCtrl: ModalController,
    public appHttpService: AppHttpService,
    public appRecentProductsService: AppRecentProductsService,
    public appLogService: AppLogService) {
    this.getListOfCurrency();
  }
  getListOfCurrency() {
    this.loading.show();
    this.appHttpService.getHttp('currency').then((data: any) => {
      this.loading.hide();
      this.currencyListArray = data;
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

      //this.appCartService.emptyCart();
      //this.appRecentProductsService.emptyRecentViewed();
      setTimeout(() => {
        window.location.reload()
        this.loading.hide()
      }, 900)
    }
  }
  getSelectedColor(c) {
    if (c.currency_id == this.config.currencyIdNumber) {
      return 'primary'
    }
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
