import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  @ViewChild(IonRefresher, { static: false }) ionRefresher: IonRefresher;
  page = 0;
  httpRunning = false;
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    public shared: SharedDataService,
    public appUserService: AppUserService,
    public appCartService: AppCartService,
    public appWishListService: AppWishListService) {


  }
  openSearchPage() {
    this.navCtrl.navigateForward("search")
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.pullRefresh()
  }
  productsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  pageNumber = 1;

  pullRefresh() {
    this.pageNumber = 1
    this.productsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    this.getProducts()
  }

  getProducts() {
    let url = "wishlist"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&products=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&page=" + this.pageNumber

    this.appHttpService.getHttp(url).then((data: any) => {
      let dat = data
      this.infinite.complete()
      if (this.pageNumber == 1) this.productsArray = []
      if (dat.length != 0) for (let value of dat) this.productsArray.push(value.products)
      if (dat.length < this.config.perPageNumber) this.infinite.disabled = true
      this.pageNumber++
      this.ionRefresher.complete()

    })
  }
  getTrashIconName() {
    this.removeHeartIcon()
    return 'trash'
  }
  removeHeartIcon() {
    try {
      let heartIcons = document.querySelectorAll('.wish-list-content .right-fab');
      for (var i = 0; i < heartIcons.length; i++) {
        heartIcons[i].remove();
      }
    } catch (error) {

    }
  }
  remove(p) {
    this.appWishListService.addRemoveWishProduct(p.product_id)
    this.productsArray.forEach((value, index) => {
      if (value.product_id == p.product_id) {
        this.productsArray.splice(index, 1)
      }
    })
  }
}
