import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

import { ConfigService } from 'src/services/config/config.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppStorageService } from 'src/services/app-storage/app-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

  searchString: any;
  productsArray: any;
  pageNumber = 1;
  searchHistoryArray = []
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public http: HttpClient,
    public loading: LoadingService,
    public appCartService: AppCartService,
    public appToastService: AppToastService,
    public shared: SharedDataService,
    public appStorageService: AppStorageService) { }
  onChangeKeyword(e) {
    //console.log(this.search);
    // if (search != undefined) {
    //rchResult = [];
    //  }
  }
  getSearchData() {
    if (this.searchString != undefined) {
      if (this.searchString == null || this.searchString == '') {
        this.appToastService.toast("Please enter something");
        return 0;
      }
    }
    else {
      this.appToastService.toast("Please enter something")
      return 0;
    }
    this.saveAndUpdateHistoryArray()
    this.openProducts()
  };
  recentSearchClick(value) {
    this.searchString = value
    this.openProducts()
  }
  openProducts() {
    this.navCtrl.navigateForward("/products/0/newest/" + this.searchString)
  }
  saveAndUpdateHistoryArray() {
    this.searchHistoryArray.push(this.searchString)
    localStorage.searchHistoryArray = JSON.stringify(this.searchHistoryArray)
  }
  goBack() {
    this.navCtrl.back()
  }
  removeAllHistory() {
    this.searchHistoryArray = []
    localStorage.searchHistoryArray = JSON.stringify(this.searchHistoryArray)
  }
  ngOnInit() {
    if (localStorage.searchHistoryArray != undefined)
      this.searchHistoryArray = JSON.parse(localStorage.searchHistoryArray)
  }

}
