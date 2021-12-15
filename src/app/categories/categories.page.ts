import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ConfigService } from 'src/services/config/config.service';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { NavController } from '@ionic/angular';
import { AppCartService } from 'src/services/app-cart/app-cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {


  parentIdNumber;
  parentNameString;
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public appCategoriesService: AppCategoriesService,
    public navCtrl: NavController,
    public appCartService: AppCartService,
    private activatedRoute: ActivatedRoute) {

 
    this.parentIdNumber = this.activatedRoute.snapshot.paramMap.get('parent')
    if (this.parentIdNumber == undefined || this.parentIdNumber == null) this.parentIdNumber = 0

  }

  openSearchPage() {
    this.navCtrl.navigateForward("search")
  }
  goBack() {
    this.navCtrl.back()
  }
  getListOfCategories() {
    let arr = []
    if (this.parentIdNumber == 0){
      arr = this.appCategoriesService.categoriesArray;
    }
    else
 
      arr = this.appCategoriesService.getCategories(this.parentIdNumber)
    return arr
  }
  getHeaderTitle() {
    
    if (this.parentIdNumber == 0) this.parentNameString = ""
    else {
      this.parentNameString = this.appCategoriesService.getCategoryName(this.parentIdNumber)
    }
    return this.parentNameString
  }
  openProductPage(value) {
    if (this.appCategoriesService.checkCategoriesHasChild(value.id)) {
      this.navCtrl.navigateForward("categories/" + value.id);
    }
    else {
      this.navCtrl.navigateForward("products/" + value.id);
    }
  }

  openSubCategories(parent) {
    let count = 0;
    for (let value of this.appCategoriesService.allCategoriesArray) {
      if (parent.id == value.parent_id) count++;
    }
    if (count != 0)
      this.navCtrl.navigateForward("/categories/" + parent.id);
    else
      this.navCtrl.navigateForward("/products/" + parent.id);
  }

  viewAll() {
    this.navCtrl.navigateForward("/products/" + this.parentIdNumber);
  }

  ngOnInit() {


  }
}
