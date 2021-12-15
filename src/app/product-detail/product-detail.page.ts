import { Component, OnInit, ApplicationRef, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPage } from '../modals/login/login.page';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppAlertService } from 'src/services/app-alert/app-alert.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppWishListService } from 'src/services/app-wishlist/app-wish-list.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { ProductAttributesModalPage } from '../modals/product-attributes-modal/product-attributes-modal.page';
import { AppAnimationsService } from 'src/services/app-animations/app-animations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { Share } from '@capacitor/share';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  public dataJson: { [k: string]: any } = {};
  sliderConfig = {
    zoom: true
  }
  public wishListFlagBool = false
  relatedProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  quantityNumber: number = 1;
  priceNumber: number = 0;
  enableOutOFStockButtonBool: boolean = false;


  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public shared: SharedDataService,
    public appCartService: AppCartService,
    public appHttpService: AppHttpService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public appEventsService: AppEventsService,
    private activatedRoute: ActivatedRoute,
    public appTranslationService: AppTranslationService,
    public appToastService: AppToastService,
    public appAlertService: AppAlertService,
    public appUserService: AppUserService,
    public appWishListService: AppWishListService,
    public appAnimationsService: AppAnimationsService,
    public sanitizer: DomSanitizer,
    public appLogService: AppLogService,
    private photoViewer: PhotoViewer) {
    this.getProductData()

  }

  zoomImage(image) {
    this.photoViewer.show(image);
  }
  checkingProductStock() {
    this.appCartService.checkProductStock(
      this.dataJson.product_id,
      this.dataJson.product_type,
      null,
      this.quantityNumber).then((data: any) => {
        if (data.status == "outOfStock") {
          this.enableOutOFStockButtonBool = true
        }
        else if (data.status == "canAddToCart") {
          this.appCartService.addToCart(this.dataJson.product_id, this.quantityNumber, null)
        }
        else if (data.status == "quantityIsLimited") {
          this.appToastService.toastError("Quantity is Limited")
          this.quantityNumber = data.stock
        }
      });
  }
  addRemoveWishProduct() {
    this.appWishListService.addRemoveWishProduct(this.dataJson.product_id)
  }

  getHeartColor() {
    if (this.isInWishList())
      return 'danger'
    else
      return 'medium'
  }
  isInWishList() {
    return this.appWishListService.productIsInList(this.dataJson.product_id)
  }
  quantityMinus() {
    if (this.quantityNumber > 1)
      this.quantityNumber--
  }
  calculatePrice() {
    return this.quantityNumber * this.priceNumber
  }
  quantityPlus() {
    this.quantityNumber++
  }

  addToCartButton() {
    if (this.dataJson.product_type == "variable")
      this.openProductAttributesModal();
    else {
      this.checkingProductStock()
    }
  }
  productDataIsEmpty() {
    for (var prop in this.dataJson) {
      if (this.dataJson.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  goBack() {
    this.navCtrl.back()
  }
  ngOnInit() {

  }

  getProductData() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    let url = "products/" + id
    url += "?language_id=" + this.config.languageIdNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    // url += "&currency=" + this.config.currencyIdNumber
    // url += "&stock=1"
    debugger;
    this.appHttpService.getHttp(url).then((data: any) => {
      this.dataJson = data
      console.log("Another prodcut data is ",data)
      this.getRelatedProducts()
    })
  }
  getRelatedProducts() {
    let url = "products"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&productCategories=" + this.dataJson.category[0].category_detail.detail[0].category_id
    this.appHttpService.getHttp(url).then((data: any) => {
      this.relatedProductsArray = data
    })
  }
  getLowestProductPrice() {
    let r = this.dataJson.product_combination[0].price
    this.dataJson.product_combination.forEach(element => {
      if (element.price < r)
        r = element.price
    });
    return r
  }

  getHighestProductPrice() {
    let r = this.dataJson.product_combination[0].price
    this.dataJson.product_combination.forEach(element => {
      if (element.price > r)
        r = element.price
    });
    return r
  }
  productDiscount() {
    var rtn = "";
    var p1 = parseInt(this.dataJson.product_price);
    var p2 = parseInt(this.dataJson.product_discount_price);

    var result = Math.abs((p1 - p2) / p1 * 100);
    result = parseInt(result.toString());
    if (result == 0) { return false }
    rtn = '-' + result + '%';
    return rtn;
  }

  async openProductAttributesModal() {
    const modal = await this.modalCtrl.create({
      component: ProductAttributesModalPage,
      cssClass: 'product-attributes-modal',
      componentProps: {
        data: this.dataJson,
      }
    });
    return await modal.present()
  }

  openReviewsPage() {
    this.navCtrl.navigateForward("/reviews/" + this.dataJson.product_id);
  }
  async share() {
    let shareRet = await Share.share({
      title: this.dataJson.detail[0].title,
      text: this.dataJson.detail[0].title,
      url: this.config.urlString,
      dialogTitle: this.dataJson.detail[0].title,
    });

  }
}
