import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { ConfigService } from 'src/services/config/config.service';

import { AppCartService } from 'src/services/app-cart/app-cart.service';



@Component({
  selector: 'app-product-attributes-modal',
  templateUrl: './product-attributes-modal.page.html',
  styleUrls: ['./product-attributes-modal.page.scss'],
})
export class ProductAttributesModalPage implements OnInit {
  @Input() data: any = {}

  imageUrlString = "assets/dumy.jpg"
  quantityNumber = 1
  priceNumber = 0
  selectedVariationsArray = [];
  selectedCombitionProductObject: any = {};
  enableOutOFStockButtonBool = false;
  constructor(
    public appToastService: AppToastService,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public appHttpService: AppHttpService,
    public appCartService: AppCartService
  ) {

  }
  ngOnInit() {
    this.priceNumber = this.data.product_price
    if (this.data.product_discount_price != 0)
      this.priceNumber = this.data.product_discount_price

    if (this.data.product_type == "variable") this.setDefaultAttributes()

  }

  setDefaultAttributes() {
    console.clear()
    this.data.product_combination[0].combination.forEach(element => {
      console.log(element)
    });
  }



  addVaration(attribute, id, name) {
    let found = 0
    this.selectedVariationsArray.forEach(element => {
      if (attribute == element.attribute) {
        element.id = id
        element.name = name
        found++
      }
    });
    if (found == 0)
      this.selectedVariationsArray.push({ "attribute": attribute, "id": id, "name": name })

    if (this.selectedVariationsArray.length == this.data.attribute.length) {
      this.findAndSelectProductCombination()
    }

  }

  findAndSelectProductCombination() {
    let found = 0
    this.data.product_combination.forEach(combinations => {
      found = 0
      this.selectedVariationsArray.forEach(inner => {

        combinations.combination.forEach(element => {
          if (element.variation_id == inner.id) {
            console.log(element.variation_id, inner.id)
            found++
          }
        });
        //let searchString = JSON.stringify(combinations)
        //if (searchString.includes('"variation_id":' + inner.id)) found++
        //console.log(inner.name, searchString.includes('"variation_id":' + inner.id))

        if (found == this.selectedVariationsArray.length) this.selectedCombitionProductObject = combinations
      });
    });
    console.log(this.selectedCombitionProductObject);
    this.imageUrlString = this.config.imgThumbnailUrlString + this.selectedCombitionProductObject.gallary.gallary_name
    this.priceNumber = this.selectedCombitionProductObject.price
    this.enableOutOFStockButtonBool = false
  }
  selectedBadge(attribute, id) {
    let found = 0
    this.selectedVariationsArray.forEach(element => {
      if (attribute == element.attribute && id == element.id) {
        found++
      }
    });
    if (found == 0) {
      return "light"
    }
    else { return "primary" }
  }

  addToCart() {

    if (this.selectedVariationsArray.length != this.data.attribute.length) {
      let msg = "Please Select all Variations"
      this.appToastService.toastError(msg)
      return;
    }
    else {
      this.checkingProductStock()
    }
  }
  checkingProductStock() {
    this.appCartService.checkProductStock(
      this.data.product_id,
      this.data.product_type,
      this.selectedCombitionProductObject.product_combination_id,
      this.quantityNumber).then((data: any) => {

        if (data.status == "outOfStock") {
          this.enableOutOFStockButtonBool = true
        }
        else if (data.status == "canAddToCart") {
          this.appCartService.addToCart(this.data.product_id, this.quantityNumber, this.selectedCombitionProductObject.product_combination_id)
        }
        else if (data.status == "quantityIsLimited") {
          this.appToastService.toastError("Quantity is Limited")
          this.quantityNumber = data.stock
        }
      });
  }



  quantityMinus() {
    if (this.quantityNumber > 1) {
      this.quantityNumber--
      this.enableOutOFStockButtonBool = false
    }
  }
  calculatePrice() {
    return this.quantityNumber * this.priceNumber
  }
  quantityPlus() {
    //this.enableOutOFStockButtonBool = false
    this.quantityNumber++
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
