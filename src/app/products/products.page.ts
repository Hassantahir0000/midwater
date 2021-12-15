import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonSlides, NavController, ActionSheetController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  scrollTopButton = false;
  products = new Array;
  selectedTab = 0
  categoryId = this.selectedTab
  categogiesSelectNumber = this.selectedTab
  categoryName = '';
  searchString = ""
  //sortArray = ['id', 'price', 'product_type', 'discount_price', 'product_status', 'product_view', 'seo_desc', 'created_at']

  // sortTypeArray = ['ASC', 'DESC']

  sortArray = ['newest', 'a - z', 'z - a', 'price : high - low', 'price : low - high', 'top seller', 'on sale', 'featured'];
  sortOrder = this.sortArray[0]
  sortOrderValue = "created_at"
  sortType = 'ASC'
  page = 1;
  applyFilter = false;
  filters = [];
  selectedFilters = [];
  price = { lower: 0, upper: 10000 };
  maxAmount = 10000;
  side = "right";
  productView = 'grid';
  httpRunning = true;
  hidePriceRange = false;
  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    public appEventsService: AppEventsService,
    public actionSheet: ActionSheetController,
    public menuCtrl: MenuController,
    public appTranslationService: AppTranslationService,
    public appCartService: AppCartService,
    public appUserService: AppUserService,
    public appLogService: AppLogService,
    public appCategoriesService: AppCategoriesService,
  ) {
    if (config.appDirectionString == "rtl") this.side = "left";

    let catIdParam = this.activatedRoute.snapshot.paramMap.get('id')
    let typeParam = this.activatedRoute.snapshot.paramMap.get('type')
    let searchParam = this.activatedRoute.snapshot.paramMap.get('search')

    if (catIdParam != null) {
      this.selectedTab = this.categoryId = this.categogiesSelectNumber = parseInt(catIdParam)
    }
    if (typeParam != null) {
      this.sortOrder = typeParam
    }
    if (searchParam != null) {
      this.searchString = searchParam
    }
    console.log(catIdParam, typeParam, searchParam)
    this.getProducts(null);
    this.getFilters(this.categoryId);
  }
  removeSearchFilter() {
    this.searchString = ""
    this.resetProductPageCountAndScrollThenGetNewProducts()
  }
  removeAttribute(id) {
    this.addVaration({ id: id }, { id: id })
    this.applyFilters()
  }

  getAttributeName(id) {
    let r = ""
    this.filters.forEach(x => {
      x.variations.forEach(y => {
        if (id == y.id) {
          r = y.detail[0].name
        }
      });
    });
    return r
  }
  goBack() {
    this.navCtrl.back()
  }
  showSelectedFilters() {
    if (this.selectedFilters.length != 0)
      return true
    else if (this.categoryId != 0)
      return true
    else if (this.sortOrder != this.sortArray[0])
      return true
    else if (this.searchString != '')
      return true

  }

  getProducts(infiniteScroll) {
    this.httpRunning = true;
    if (this.page == 1) { this.loading.show(); }
    let url = "products"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&page=" + this.page
    url += "&sortBy=" + this.sortOrderValue
    url += "&sortType=" + this.sortType //(ASC,DESC)

    if (this.searchString != "") url += "&searchParameter=" + this.searchString

    if (this.sortOrder == "top seller") url += "&topSelling=1"
    if (this.sortOrder == "featured") url += "&isFeatured=1"
    if (this.selectedTab != 0) url += "&productCategories=" + this.selectedTab

    if (this.applyFilter == true) {
      url += "&price_from=" + this.price.lower
      url += "&price_to=" + this.price.upper

      if (this.selectedFilters.length != 0) {
        url += "&variations=" + this.selectedFilters.toString()
      }
    }


    this.appHttpService.getHttp(url).then((data: any) => {
      console.log("Products are :",data);
      this.httpRunning = false;
      // console.log(data.product_data.length + "   " + this.page);
      this.infinite.complete();
      if (this.page == 1) { this.products = new Array; this.loading.hide(); this.scrollToTop(); }
      this.page++;
      for (let value of data) {
        this.products.push(value);
      }
      if (data.length == 0) { this.infinite.disabled = true; }
    });

  }

  //changing tab
  changeTab(c) {
    if (c == this.categoryId) return
    console.log("c is ",c)
    this.applyFilter = false;
    this.infinite.disabled = false;
    this.page = 1;
    this.categogiesSelectNumber = this.categoryId = this.selectedTab = c;
    console.log("cat id ",this.categoryId)
    //this.getProducts(null);
    this.removeFilters()
    //this.getFilters(this.selectedTab);
  }

  //============================================================================================  
  //getting countries from server
  getFilters(id) {

    let url = "attributes"
    url += "?limit=" + 1000
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    url += "&getVariation=1"
    url += "&getVariationByLarguage=1"

    this.appHttpService.getHttp(url).then((data: any) => {
      this.filters = data;
      console.log("Data ha ",data)
    });
  };

  selectedBadge(att, v) {
    let attribute = att.detail[0].name
    let valueName = v.detail[0].name
    let valueId = v.id

    let found = 0
    this.selectedFilters.forEach((value, index) => {
      if (value == valueId) {
        found++
      }
    });

    if (found == 0) {
      return "light"
    }
    else { return "primary" }
  }

  addVaration(att, v) {
    // let attribute = att.detail[0].name
    // let valueName = v.detail[0].name
    let valueId = v.id
    let found = 0
    this.selectedFilters.forEach((value, index) => {
      //value.name == attribute && value.value == valueName && value.id == valueId
      if (value == valueId) {
        this.selectedFilters.splice(index, 1)
        found++
      }
    });
    //{ 'name': attribute, 'value': valueName, 'id': valueId }
    if (found == 0)
      this.selectedFilters.push(valueId);
    //console.log(this.selectedFilters)
  }
  applyFilters() {
    this.applyFilter = true;
    this.resetProductPageCountAndScrollThenGetNewProducts()
    this.menuCtrl.close("menu2");
  }
  resetFilters() {
    this.getFilters(this.selectedTab);
    this.menuCtrl.close("menu2");
  }
  removeFilters() {
    this.selectedFilters = []
    this.applyFilter = false;
    this.menuCtrl.close("menu2");
    this.resetProductPageCountAndScrollThenGetNewProducts()
    this.getFilters(this.selectedTab);
  }
  resetProductPageCountAndScrollThenGetNewProducts() {
    this.page = 1;
    this.infinite.disabled = false;
    this.getProducts(null);
  }
  ngOnChanges() {

  }

  getSortProducts(value) {
    //console.log(value);
    if (value == this.sortOrder) return 0;
    else {
      this.sortOrder = value;
      if (this.sortOrder == "newest") {
        this.sortOrderValue = 'created_at'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "price : high - low") {
        this.sortOrderValue = 'price'
        this.sortType = "DESC"
      }
      if (this.sortOrder == "price : low - high") {
        this.sortOrderValue = 'price'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "top seller") {
        this.sortOrderValue = 'created_at'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "on sale") {
        this.sortOrderValue = 'discount_price'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "featured") {
        this.sortOrderValue = 'created_at'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "a - z") {
        this.sortOrderValue = 'created_at'
        this.sortType = "ASC"
      }
      if (this.sortOrder == "z - a") {
        this.sortOrderValue = 'created_at'
        this.sortType = "DESC"
      }
      this.resetProductPageCountAndScrollThenGetNewProducts()
    }

    //sortArray = ['id', 'price', 'product_type', 'discount_price', 'product_status', 'product_view', 'seo_desc', 'created_at']

    // sortTypeArray = ['ASC', 'DESC']

    // sortArray = ['newest', 'a - z', 'z - a', 'price : high - low', 'price : low - high', 'top seller', 'on sale', 'featured'];
  }


  async openSortBy() {
    var buttonArray = [];
    this.appTranslationService.translateArray(this.sortArray).then(async (res: any) => {

      for (let key in res) {
        buttonArray.push({ text: res[key], handler: () => { this.getSortProducts(key) } });
      }
      this.appTranslationService.translateString("Cancel").then(async (res: string) => {
        buttonArray.push(
          {
            text: res,
            role: 'cancel',
            handler: () => {
            }
          }
        );
      });
      var action = await this.actionSheet.create({
        cssClass: 'shop-action-sheet',
        buttons: buttonArray
      });
      await action.present();
    });
  }

  toggleMenu() {
    this.menuCtrl.toggle("menu2");
  }
  changeLayout() {
    if (this.productView == 'list') this.productView = "grid";
    else this.productView = "list";

    this.scrollToTop();
  }

  scrollToTop() {
    try {
      this.content.scrollToTop(700);
      this.scrollTopButton = false;
    } catch (error) {

    }
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
    //   console.log(e);
  }

  ionViewDidEnter() {
  }
  ngOnInit() {
   
  }
}