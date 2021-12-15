import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-product-card-style17',
  templateUrl: './product-card-style17.component.html',
  styleUrls: ['./product-card-style17.component.scss'],
})
export class ProductCardStyle17Component implements OnInit {

  @Input('data') data;//product data


  @Output() onClickProduct = new EventEmitter();

  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public navCtrl: NavController
  ) {

  }
  openProductPage() {
    this.onClickProduct.emit();
  }

  ngOnInit() { }

}

