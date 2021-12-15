import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-home-page-style1',
  templateUrl: './home-page-style1.component.html',
  styleUrls: ['./home-page-style1.component.scss'],
})
export class HomePageStyle1Component implements OnInit {

  constructor(
    public config: ConfigService,
    public nav: NavController,
    public shared: SharedDataService,
    public appCategoriesService: AppCategoriesService) {
  }
  onClickCategory(c) {
    this.nav.navigateForward("/products/" + c.id + "/newest");
  }
  ngOnInit() {
  }

}
