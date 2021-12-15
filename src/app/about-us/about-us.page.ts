import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { PrivacyPolicyPage } from '../modals/privacy-policy/privacy-policy.page';
import { TermServicesPage } from '../modals/term-services/term-services.page';
import { RefundPolicyPage } from '../modals/refund-policy/refund-policy.page';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  pagetitle:any;

  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public appCartService: AppCartService,
    public appHttpService: AppHttpService,
  ) {
  }

  ngOnInit() {
    if (this.shared.aboutUs == "")
      this.getPageData()
  }
  getPageData() {
    let url = "pages/1"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.shared.aboutUs = data.detail[0].description
      this.pagetitle=data.detail[0].title;

    })
  }
  dismiss() {
    this.modalCtrl.dismiss()
  }
  async showModal(value) {
    if (value == 'privacyPolicy') {
      let modal = await this.modalCtrl.create({
        component: PrivacyPolicyPage
      });
      return await modal.present();
    }
    else if (value == 'termServices') {
      let modal = await this.modalCtrl.create({
        component: TermServicesPage
      });
      return await modal.present();
    }
    else {
      let modal = await this.modalCtrl.create({
        component: RefundPolicyPage
      });
      return await modal.present();
    }
  }
  async openSite() {
    this.loading.autoHide(2000);
    await Browser.open({ url: this.config.yourSiteUrlString });
  }

}
