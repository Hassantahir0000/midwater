import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { ModalController, IonSearchbar, NavParams } from '@ionic/angular';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppLogService } from 'src/services/app-log/app-log.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.page.html',
  styleUrls: ['./select-country.page.scss'],
})
export class SelectCountryPage implements OnInit {
  @ViewChild('Searchbar', { static: false }) searchBar: IonSearchbar;

  searchQuery: string = '';
  items;
  countries = new Array;

  constructor(
    public http: HttpClient,
    public appEventsService: AppEventsService,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public navParams: NavParams,
    public appOrderService: AppOrderService,
    public appLogService: AppLogService) {

    let url = 'country?sortBy=id&sortType=ASC&limit=999'
    url += "&language_id=" + this.config.languageIdNumber

    appHttpService.getHttp(url, true).then((data: any) => {
      this.items = this.countries = data
      setTimeout(() => { this.searchBar.setFocus(); }, 250);
    });

  }

  initializeItems() {
    this.items = this.countries
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.country_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  //close modal
  async dismiss(data) {
    await this.modalCtrl.dismiss(data);
  }
  selectCountry(data) {
    console.log(data);
    this.dismiss(data);
  }

  ngOnInit() {
  }

}
