import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style4',
  templateUrl: './product-card-style4.component.html',
  styleUrls: ['./product-card-style4.component.scss'],
})
export class ProductCardStyle4Component implements OnInit {

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

  ngOnInit() { 
    console.log("Product Data is ",this.data);
  }

}

