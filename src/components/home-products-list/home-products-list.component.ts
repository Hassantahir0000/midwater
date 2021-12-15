import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-home-products-list',
  templateUrl: './home-products-list.component.html',
  styleUrls: ['./home-products-list.component.scss'],
})
export class HomeProductsListComponent implements OnInit {

  constructor(
    public config: ConfigService,
    public nav: NavController,
    public appHttpService: AppHttpService,
    public appCategoriesService: AppCategoriesService) { }

  ngOnInit() {
    this.getProducts()
  }
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  productsArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  pageNumber = 1;

  getProducts() {

    let url = "products"
    url += "?limit=" + this.config.perPageNumber
    url += "&getCategory=1"
    url += "&getDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    //url += "&productType=simple"
    url += "&currency=" + this.config.currencyIdNumber
    url += "&stock=1"
    url += "&page=" + this.pageNumber

    this.appHttpService.getHttp(url).then((data: any) => {
      let dat = data;
      this.infinite.complete();
      if (this.pageNumber == 1) this.productsArray = [];
      if (dat.length != 0) for (let value of dat) this.productsArray.push(value);
      if (dat.length < this.config.perPageNumber) this.infinite.disabled = true;
      this.pageNumber++;
    })
  }

}
