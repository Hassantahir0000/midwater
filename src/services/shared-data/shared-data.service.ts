
import { Injectable } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AppEventsService } from 'src/services/app-events/app-events.service';

@Injectable()
export class SharedDataService {

  public bannersArray = [1, 1, 1, 1, 1];
  public tab1Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab2Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab3Array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public flashSaleProductsArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


  public privacyPolicy = "";
  public termServices = "";
  public refundPolicy = "";
  public aboutUs = "";

  public tempdata: { [k: string]: any } = {};
  public currentOpenedModel: any = null;
  public singleProductPageDataArray = [];
  public singlePostData: any;
  public myOrderDetialPageData: any;
  public lab = false;
  public primaryHexColor = "#3980ff";
  public productDeleteId: any;
  constructor(
    public appEventsService: AppEventsService,
    public platform: Platform,
    public nav: NavController,
    public menuCtrl: MenuController,
  ) {
  }
  openShopPage() {
    this.nav.navigateForward("products")
  }
  toggleMenu() {
    this.menuCtrl.toggle("mainMenu");
  }
  public splashScreenHide = false;

  showAd() {
    //this.loading.autoHide(2000);
    this.appEventsService.publish('showAd', "");
  }


  getProductRatingPercentage(rating: any) {
    let val = (parseFloat(rating) * 100) / 5;
    return val + '%'
  }

}
