import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style2',
  templateUrl: './product-card-style2.component.html',
  styleUrls: ['./product-card-style2.component.scss'],
})
export class ProductCardStyle2Component implements OnInit {

  @Input('data') data;//product data
  @Input('wishListStatus') wishListStatus;//product data


  @Output() onClickProduct = new EventEmitter();
  @Output() onClickWishIcon = new EventEmitter();

  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController
  ) {

  }
  clickWishIcon() {
    this.onClickWishIcon.emit()
  }
  getHeartColor() {
    if (this.wishListStatus)
      return 'danger'
    else
      return 'medium'
  }
  openProductPage() {
    this.onClickProduct.emit();
  }

  ngOnInit() { }

}

