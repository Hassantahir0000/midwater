import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-categories-page-style2',
  templateUrl: './categories-page-style2.component.html',
  styleUrls: ['./categories-page-style2.component.scss'],
})
export class CategoriesPageStyle2Component implements OnInit {

  @Input('parent') parent//product data

  @Input('dataArray') categoriesArray//product data
  @Output() onClickCategory = new EventEmitter()
  constructor(
    public appCategoriesService: AppCategoriesService,
    public config: ConfigService
  ) {

  }

  clickCategory(value) {
    this.onClickCategory.emit(value)
  }
  ngOnInit() {
  
  }

}
