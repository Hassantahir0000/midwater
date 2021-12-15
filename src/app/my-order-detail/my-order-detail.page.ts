import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, IonContent } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { GoogleMaps, GoogleMapsEvent, LatLng, Marker, Environment } from '@ionic-native/google-maps';

import firebase from 'firebase/app';
import 'firebase/database';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.page.html',
  styleUrls: ['./my-order-detail.page.scss'],
})
export class MyOrderDetailPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  order: { [k: string]: any } = {};
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    public appTranslationService: AppTranslationService,
    public appUserService: AppUserService,
    public appLogService: AppLogService
  ) {
    //this.order = this.shared.myOrderDetialPageData;
    this.getData()
  }
  getSingleProductDetail(id) {
    var dat: { [k: string]: any } = {};
    if (this.appUserService.customerData != null)
      dat.customers_id = this.appUserService.customerData.customers_id;
    else
      dat.customers_id = null;
    dat.products_id = id;
    dat.language_id = this.config.languageIdNumber;
    dat.currency_code = this.config.currencyCodeString;
    this.appHttpService.postHttp(this.config.urlString + 'getallproducts', dat).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        let p = data.product_data[0]
        this.shared.singleProductPageDataArray.push(p);
        this.navCtrl.navigateForward("product-detail/" + p.id);
      }
    });
  }

  getShippingAddressData() {
    let selected = false
    return {
      text1: this.order.delivery_first_name + ' ' + this.order.delivery_last_name,
      text2: this.order.delivery_country_name,
      text3: this.order.delivery_street_aadress + " " + this.order.delivery_city + " " + this.order.delivery_postcode,
      selected: selected
    }
  }
  getBillingAddressData() {
    let selected = false
    return {
      text1: this.order.billing_first_name + ' ' + this.order.billing_last_name,
      text2: this.order.billing_country_name,
      text3: this.order.billing_street_aadress + " " + this.order.billing_city + " " + this.order.billing_postcode,
      selected: selected
    }
  }
  getData() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    let url = "customer/order/" + id
    url += "?orderDetail=1"
    url += "&productDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.order = data
    })
  }
  goBack() {
    this.navCtrl.back()
  }
  dataIsEmpty() {
    for (var prop in this.order) {
      if (this.order.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
  getSubtotal() {
    let total = 0;
    this.order.data.forEach(element => {
      total += parseFloat(element.final_price);
    });
    return total;
  }

  ionViewDidEnter() {
    this.order = this.shared.myOrderDetialPageData;
  }
  // For Scroll To Top Content
  scrollToBottom() {
    this.content.scrollToBottom(700);
  }
  trackOrder() {
    this.scrollToBottom();
    let _this = this;
    var deliveryBoyLocationDatabase = firebase.database().ref('location/' + this.order.deliveryboy_info[0].deliveryboy_id);
    deliveryBoyLocationDatabase.on('value', function (value) {
      // console.log(value.val());
      var loc = value.val()
      _this.loadMap(loc.latitude, loc.longitude);
    });
  }
  public countLoation = 0;

  public orderMap;
  public marker;
  loadMap(latitude, longitude) {

    if (this.countLoation == 0) {
      // This code is necessary for browser
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': this.config.googleMapApiString,
        //'API_KEY_FOR_BROWSER_DEBUG': this.config.googleMapId
      });
      /* The create() function will take the ID of your map element */
      this.orderMap = GoogleMaps.create('maporder');
      this.orderMap.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
        const coordinates: LatLng = new LatLng(latitude, longitude);

        this.orderMap.setCameraTarget(coordinates);
        this.orderMap.setCameraZoom(16);
      });

      this.appTranslationService.translateString("My Location").then((data: any) => {
        this.orderMap.addMarker({
          position: { lat: this.order.delivery_latitude, lng: this.order.delivery_longitude },
          title: data,
        })
      })
      this.appTranslationService.translateString("Delivery Boy").then((data: any) => {
        this.marker = this.orderMap.addMarker({
          position: { lat: latitude, lng: longitude },
          title: data,
          icon: 'blue'
        }).then((m) => {
          this.marker = m;
        }, (error) => {

          console.log(error);
          this.appLogService.log("Error : MyOrderDetailPage : Lodaing Map", error);
        });
      })
    }
    else {
      if (this.marker)
        this.marker.setPosition(new LatLng(latitude, longitude));
      const c: LatLng = new LatLng(latitude, longitude);
      this.orderMap.setCameraTarget(c);
    }


    let _this = this;
    this.countLoation++;
  }
  ngOnInit() {
  }

}
