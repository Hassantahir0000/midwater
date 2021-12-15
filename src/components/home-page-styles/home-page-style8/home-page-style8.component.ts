import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-home-page-style8',
  templateUrl: './home-page-style8.component.html',
  styleUrls: ['./home-page-style8.component.scss'],
})
export class HomePageStyle8Component implements OnInit {

  constructor(
    public config: ConfigService,
    public nav: NavController,
    public shared: SharedDataService,
    public appCategoriesService: AppCategoriesService) {

  }
  onClickCategory(c) {
    this.nav.navigateForward("/products/" + c.id + "/newest");
  }
  openProductPage(value) {
    if (this.appCategoriesService.checkCategoriesHasChild(value.id)) {
      this.nav.navigateForward("categories/" + value.id);
    }
    else {
      this.nav.navigateForward("products/" + value.id);
    }
  }
  ngOnInit() { }
}
