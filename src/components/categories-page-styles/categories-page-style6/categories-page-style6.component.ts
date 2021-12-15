import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-categories-page-style6',
  templateUrl: './categories-page-style6.component.html',
  styleUrls: ['./categories-page-style6.component.scss'],
})
export class CategoriesPageStyle6Component implements OnInit {

  @Input('parent') parent//product data

  @Input('dataArray') categoriesArray//product data
  @Output() onClickCategory = new EventEmitter()

  parentIdNumber = 0;
  segment = "0";
  parentObject: any;
  constructor(
    public appCategoriesService: AppCategoriesService,
    public config: ConfigService
  ) {

  }

  getListOfCategories() {
    let arr = []

    if (this.categoriesArray[0].id != undefined && this.parentIdNumber == 0) {
      this.parentObject = this.categoriesArray[0]
      this.parentIdNumber = this.parentObject.id
      this.segment = this.parentIdNumber.toString()
    }
    if (this.segment != "0") {
      this.parentIdNumber = parseInt(this.segment)
      this.parentObject = this.appCategoriesService.getCategoryObject(this.parentIdNumber)
    }

    if (this.parentIdNumber != 0)
      arr = this.appCategoriesService.getCategories(this.parentIdNumber)
    return arr
  }
  
  clickCategory(value) {
    this.onClickCategory.emit(value)
  }

  ngOnInit() {
    console.log(this.categoriesArray);
  }

}
