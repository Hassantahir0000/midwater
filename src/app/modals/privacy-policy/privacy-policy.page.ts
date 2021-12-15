import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  pagetitle:any;

  constructor(
    public mdCtrl: ModalController,
    public shared: SharedDataService,
    public config: ConfigService,
    public appHttpService: AppHttpService,) {
    this.shared.currentOpenedModel = this;

  }
  ngOnInit() {
    if (this.shared.privacyPolicy == "")
      this.getPageData()
  }
  getPageData() {
    let url = "pages/3"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.shared.privacyPolicy = data.detail[0].description
      this.pagetitle=data.detail[0].title;
      console.log('Page Data is ',data)
    })
  }

  // For Modal Dismiss
  dismiss() {
    this.shared.currentOpenedModel = null;
    this.mdCtrl.dismiss();
  }
}
