import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
})
export class ProductsSliderComponent implements OnInit {

  @Input('filter') filter//product data
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPageNumber,
    spaceBetween: 10
  }

  constructor(
    public config: ConfigService,
    public nav: NavController,
    public appHttpService: AppHttpService,
    public appCategoriesService: AppCategoriesService) { }

  ngOnInit() {
    console.log(this.filter)
    this.getProducts()

  }
  productsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  pageNumber = 1;

  getProducts() {
    //let sortBy = ""
    //sortBy = this.filter

    let url = "products"
    url += "?limit=10"
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&page=" + this.pageNumber
    if (this.filter == "topseller") {
      url += "&sortType=ASC"
      url += "&topSelling=1"
    }
    if (this.filter == "newest") {
      url += "&sortType=ASC"
    }
    if (this.filter == "featured") {
      url += "&sortType=ASC"
      url += "&isFeatured=1"
    }

    this.appHttpService.getHttp(url).then((data: any) => {
      let dat = data;
      if (this.pageNumber == 1) this.productsArray = [];
      if (dat.length != 0) for (let value of dat) this.productsArray.push(value);
      this.pageNumber++;
    })
  }
  openProducts() {
    this.nav.navigateForward("/products/0");
  }


}
