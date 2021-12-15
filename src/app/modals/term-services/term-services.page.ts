import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';


@Component({
  selector: 'app-term-services',
  templateUrl: './term-services.page.html',
  styleUrls: ['./term-services.page.scss'],
})
export class TermServicesPage implements OnInit {

  pagetitle:any;

  constructor(
    public mdCtrl: ModalController,
    public shared: SharedDataService,
    public config: ConfigService,
    public appHttpService: AppHttpService,) {
    this.shared.currentOpenedModel = this;
  }
  ngOnInit() {
    if (this.shared.termServices == "")
      this.getPageData()
  }
  getPageData() {
    let url = "pages/4"
    url += "?language_id=" + this.config.languageIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.shared.termServices = data.detail[0].description
      this.pagetitle=data.detail[0].title;
    })
  }

  // For Modal Dismiss
  dismiss() {
    this.shared.currentOpenedModel = null;
    this.mdCtrl.dismiss();
  }
}
