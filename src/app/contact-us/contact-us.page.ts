import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ConfigService } from 'src/services/config/config.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { GoogleMaps, GoogleMapsEvent, LatLng, Marker } from '@ionic-native/google-maps';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
declare var google;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})

export class ContactUsPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  contact = {
    last_name: '',
    first_name: '',
    email: '',
    message: ''
  };
  errorMessage = '';

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public config: ConfigService,
    public loading: LoadingService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public appUserService: AppUserService
  ) {

  }
  goBack() {
    this.navCtrl.back()
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  //============================================================================================

  ionViewWillEnter() {
    if (this.appUserService.userIsLogedIn()) {
      this.contact.first_name = this.appUserService.customerData.firstName
      this.contact.last_name = this.appUserService.customerData.lastName
      this.contact.email = this.appUserService.customerData.email
    }
  }

  submit() {

    debugger;
    let info = this.contact;
    this.appHttpService.postHttp('contact-us', info, true).then((data: any) => {

      if (this.appUserService.userIsLogedIn()) {
        this.contact.message = ""
        this.contact.email = ""
        this.contact.first_name = ""
        this.contact.last_name = ""
      }
      else {
        this.contact.message = ""
      }
    });

  };
  loadMap() {

    // /* The create() function will take the ID of your map element */
    // const map = GoogleMaps.create('map');

    // map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
    //   const coordinates: LatLng = new LatLng(this.config.latitude, this.config.longitude);
    //   map.setCameraTarget(coordinates);
    //   map.setCameraZoom(15);
    // });

    // let marker: Marker = map.addMarkerSync({
    //   position: { lat: this.config.latitude, lng: this.config.longitude },
    //   title: this.config.address,
    // })

  }
  ngOnInit() {
  }

}
