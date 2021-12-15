import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ConfigService } from 'src/services/config/config.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppUserService } from 'src/services/app-user/app-user.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {


  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public config: ConfigService,
    public appCartService: AppCartService,
    public appEventsService: AppEventsService,
    public appUserService: AppUserService
  ) {
  }
  openHome() {
    this.navCtrl.navigateRoot("tabs/home");
  }
  openOrders() {
    this.navCtrl.navigateRoot("my-orders");
  }
  goBack() {
    this.openHome()
  }
  ngOnInit() {
    this.appCartService.getCartFromServer();
  }

}
