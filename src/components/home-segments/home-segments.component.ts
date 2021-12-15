import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-home-segments',
  templateUrl: './home-segments.component.html',
  styleUrls: ['./home-segments.component.scss'],
})
export class HomeSegmentsComponent implements OnInit {
  topSegmentsString = "1"
  constructor(
    public config: ConfigService,
    public nav: NavController,
    public appHttpService: AppHttpService) { }

  ngOnInit() {
    this.getProducts("topseller", 1)
    this.getProducts("featured", 2)
    this.getProducts("onsale", 3)
  }
  oneProductsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  twoProductsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  threeProductsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  getProducts(sort, array) {

    let url = "products"
    url += "?limit=" + 10
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&sortType=ASC"

    if (sort == "topseller") {
      url += "&topSelling=1"
    }
    if (sort == "onsale") {
      url += "&sortBy=discount_price"
    }
    if (sort == "featured") {
      url += "&isFeatured=1"
    }

    this.appHttpService.getHttp(url).then((data: any) => {
      let dat = data
      if (array == 1) this.oneProductsArray = dat
      if (array == 2) this.twoProductsArray = dat
      if (array == 3) this.threeProductsArray = dat
    })
  }

}
