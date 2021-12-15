import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppCategoriesService } from 'src/services/app-categories/app-categories.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-categories-page-style1',
  templateUrl: './categories-page-style1.component.html',
  styleUrls: ['./categories-page-style1.component.scss'],
})
export class CategoriesPageStyle1Component implements OnInit {

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
