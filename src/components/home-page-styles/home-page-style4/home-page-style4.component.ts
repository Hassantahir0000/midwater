import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-home-page-style4',
  templateUrl: './home-page-style4.component.html',
  styleUrls: ['./home-page-style4.component.scss'],
})
export class HomePageStyle4Component implements OnInit {

  constructor(public config: ConfigService,
    public nav: NavController,
    public shared: SharedDataService,
    public appCategoriesService: AppCategoriesService) { }
  onClickCategory(c) {
    this.nav.navigateForward("/products/" + c.id + "/newest");
  }


  ngOnInit() { }

}
