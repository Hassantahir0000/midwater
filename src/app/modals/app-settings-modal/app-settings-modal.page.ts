import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AboutUsPage } from 'src/app/about-us/about-us.page';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { ConfigService } from 'src/services/config/config.service';
import { CurrencyListPage } from '../currency-list/currency-list.page';
import { LanguagePage } from '../language/language.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { RefundPolicyPage } from '../refund-policy/refund-policy.page';
import { TermServicesPage } from '../term-services/term-services.page';
import {ContactUsContentPage} from '../contact-us-content/contact-us-content.page';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
@Component({
  selector: 'app-app-settings-modal',
  templateUrl: './app-settings-modal.page.html',
  styleUrls: ['./app-settings-modal.page.scss'],
})
export class AppSettingsModalPage implements OnInit {

  darkModeToggle = false;
  pageTitle1:any;
  pageTitle2:any;
  pageTitle3:any;
  pageTitle4:any;
  constructor(
    public modalCtrl: ModalController,
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public config: ConfigService,
    public shared : SharedDataService
  ) {
    if (this.config.darkModeBool) this.darkModeToggle = true
  }

  async openAboutUsPage() {
    let modal = await this.modalCtrl.create({
      component: AboutUsPage,
    });
    return await modal.present();
  }
  async openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage,
    });
    return await modal.present();
  }
  async openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage,
    });
    return await modal.present();
  }
  async openTermsPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage,
    });
    return await modal.present();
  }

  async openContactPage(){
    let modal = await this.modalCtrl.create({
      component: ContactUsContentPage,
    });
    return await modal.present();
  }

  async openLanguagePage() {
    let modal = await this.modalCtrl.create({
      component: LanguagePage,
    });
    return await modal.present();
  }
  async openCurrencyPage() {
    let modal = await this.modalCtrl.create({
      component: CurrencyListPage,
    });
    return await modal.present();
  }


  logout() {

    this.appHttpService.postHttp('customer_logout', {}, true).then((data: any) => {
      this.appUserService.logOut()
      this.dismiss()
    });

  }

  changeDarkMode() {
    this.config.enableDarkMode(this.darkModeToggle)
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.getPageData();
  }




  getPageData() {
    var url = "pages/1"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.pageTitle1=data.detail[0].title;
      console.log("page 1 is",this.pageTitle1)
    })

    var url = "pages/2"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.pageTitle2=data.detail[0].title;
      console.log("page 2 is",this.pageTitle2)
    })

    var url = "pages/3"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.pageTitle3=data.detail[0].title;
      console.log("page 3 is",this.pageTitle3)
    })

    var url = "pages/4"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.pageTitle4=data.detail[0].title;
      console.log("page 4 is",this.pageTitle4)
    })
    
  }

}
