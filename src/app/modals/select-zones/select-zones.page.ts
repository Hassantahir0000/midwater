import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController, } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';

@Component({
  selector: 'app-select-zones',
  templateUrl: './select-zones.page.html',
  styleUrls: ['./select-zones.page.scss'],
})
export class SelectZonesPage implements OnInit {

  searchQuery: string = '';
  items;
  zones = new Array;
  countryId = 0;
  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appTranslationService: AppTranslationService,
    public config: ConfigService,
    public appHttpService: AppHttpService) {

    this.countryId = this.navParams.get('id');

    let url = 'country/' + this.countryId
    url += "?getStates=1"
    url += "&language_id=" + this.config.languageIdNumber

    appHttpService.getHttp(url, true).then((data: any) => {
      this.items = this.zones = data.states
    });
  }

  initializeItems() {
    this.items = this.zones
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //close modal
  async dismiss(data) {
    await this.modalCtrl.dismiss(data);
  }
  selectZone(data) {
    if (data == "other") {
      this.appTranslationService.translateString("other").then((data: any) => {
        this.dismiss({ id: 0, name: data })
      })
    }
    else
      this.dismiss(data);
  }
  ngOnInit() {
  }
}
