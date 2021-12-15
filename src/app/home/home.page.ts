import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { IonSlides, ModalController } from '@ionic/angular'
import { NavController, IonContent } from '@ionic/angular'
import { SharedDataService } from 'src/services/shared-data/shared-data.service'
import { ConfigService } from 'src/services/config/config.service'
import { Router } from '@angular/router'
import { AppEventsService } from 'src/services/app-events/app-events.service'
import { AppRecentProductsService } from 'src/services/app-recentproducts/app-recent-products.service'
import { AppCartService } from 'src/services/app-cart/app-cart.service'
import { Capacitor } from '@capacitor/core'
import { AppLogPagePage } from '../modals/app-log-page/app-log-page.page'
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('recentSlider', { static: false }) slider: IonSlides;

  segments = "topSeller"//first segment by default 
  scrollTopButton = false;//for scroll down fab 
  //for product slider after banner

  constructor(
    public nav: NavController,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public appEventsService: AppEventsService,
    public router: Router,
    public shared: SharedDataService,
    public appCartService: AppCartService,
    public appRecentProductsService: AppRecentProductsService) {
  }
  toggleMenu() {
    this.shared.toggleMenu()
  }
  openSearchPage() {
    this.nav.navigateForward("search")
  }
  setMethod(d) {
    console.log(d);
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
    }
  }

  // For FAB Scroll
  onScroll(e) {
    if (e.detail.scrollTop >= 500) {
      this.scrollTopButton = true;
    }
    if (e.detail.scrollTop < 500) {
      this.scrollTopButton = false;
    }
  }
  async openAppLog() {
    const modal = await this.modalCtrl.create({
      component: AppLogPagePage
    });
    return await modal.present();
  }
  // For Scroll To Top Content
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  openProducts(value) {
    this.nav.navigateForward("/products/0/" + value);
  }

}
