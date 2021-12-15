import { Component, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppOnStartService } from 'src/services/app-on-start/app-on-start.service';
import { Capacitor } from '@capacitor/core';
import { DemoSettingsPage } from './modals/demo-settings/demo-settings.page';
import { ConfigService } from 'src/services/config/config.service';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { PrivacyPolicyPage } from './modals/privacy-policy/privacy-policy.page';
import { RefundPolicyPage } from './modals/refund-policy/refund-policy.page';
import { TermServicesPage } from './modals/term-services/term-services.page';
import { ContactUsContentPage } from './modals/contact-us-content/contact-us-content.page';
import { AboutUsPage } from 'src/app/about-us/about-us.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  pageTitle1:any;
  pageTitle2:any;
  pageTitle3:any;
  pageTitle4:any;

  constructor(
    public config: ConfigService,
    public modalCtrl: ModalController,
    public appOnStartService: AppOnStartService,
    private router: Router,
    private zone: NgZone,
    private shared: SharedDataService,
    public appCategoriesService: AppCategoriesService,
    private appUserService: AppUserService,
    public appHttpService : AppHttpService
  ) 
  
  
  {
    this.initializeApp();
  }

  initializeApp() {
    if (Capacitor.isNativePlatform()) {
      this.initializeDeepLink()
    }
    this.initializeDeepLink()
    this.appOnStartService.loadAppSetting();

  }
  initializeDeepLink() {
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2 
        // let string1 = data.url
        // let string2 = this.config.urlString
        // if (string1.indexOf(string2) != -1) {
        //   this.router.navigateByUrl('/tabs/home');
        // }
        const slug = data.url.split(".com").pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
   async openDemoSettings() {
    let modal = await this.modalCtrl.create({
      component: DemoSettingsPage,
    });
    return await modal.present();
  }
  public openedCategories = []
  categoryListIsSelected(id) {
    let opened = false
    this.openedCategories.forEach(element => {
      if (id == element) opened = true
    });
    return opened
  }
  getRightIcon(id) {
    if (this.categoryListIsSelected(id)) {
      return "chevron-down-outline"
    }
    else {
      return "chevron-forward-outline"
    }
  }
  showHideCategoryList(id) {
    debugger;
    let found = 0
    this.openedCategories.forEach((value, index) => {
      if (id == value) {
        found++
        this.openedCategories.splice(index, 1)
      }
    });
    if (found == 0)
      this.openedCategories.push(id)
  }
  openCategory(id) {
    debugger;
    this.router.navigateByUrl("products/" + id);
    this.shared.toggleMenu()
  }
  openShopByFilter(value) {
    this.router.navigateByUrl("products/0/" + value)
    this.shared.toggleMenu()
  }
  getTitleName() {
    if (this.appUserService.userIsLogedIn())
      return this.appUserService.customerData.firstName
    else
      return "guest"
  }


  openFeedback(){
    this.router.navigateByUrl("contact-us")
    this.shared.toggleMenu()
  }
  
  async openAboutUsPage() {
    let modal = await this.modalCtrl.create({
      component: AboutUsPage,
    });
    this.shared.toggleMenu()
    return await modal.present();
  }
  async openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage,
    });
    this.shared.toggleMenu()
    return await modal.present();
  }
  async openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage,
    });
    this.shared.toggleMenu()
    return await modal.present();
  }
  async openTermsPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage,
    });
     this.shared.toggleMenu()
    return await modal.present();
  }
  
}

