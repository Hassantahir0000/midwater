import { Component } from '@angular/core';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ConfigService } from 'src/services/config/config.service';
import { NavController } from '@ionic/angular';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public homePath = "./home-pages/home/home.module#HomePageModule"
  constructor(
    public shared: SharedDataService,
    public appCartService: AppCartService,
    public config: ConfigService,
    public navCtrl: NavController,
    public appUserService: AppUserService,
    public appLogService: AppLogService
    ) {

  }

  ionChange(appTabs) {
    // this.config.currentRoute = "tabs/" + appTabs.getSelected();
    // //console.log(this.config.currentRoute);
    // if (this.appUserService.customerData.customers_id == null && this.config.currentRoute == 'tabs/cart') {
    //   this.navCtrl.navigateForward("/tabs/cart");
    // }
  }

}
