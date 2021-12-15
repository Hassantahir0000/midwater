import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {


  public languagesArray = [];
  selectedLanguage;
  constructor(
    public loading: LoadingService,
    public modalCont: ModalController,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public shared: SharedDataService) {
    this.getLanguages();
  }
  getLanguages() {
    //getting all languages
    this.loading.show();
    this.appHttpService.getHttp('language?page=1&limit=100').then((data: any) => {
      this.loading.hide();
      this.languagesArray = data;
      for (let data of this.languagesArray) {
        if (data.id == this.config.languageIdNumber) {
          this.selectedLanguage = data;
        }
      }
    });
  }
  updateLanguage(lang) {
    if (lang != undefined && this.config.languageIdNumber != lang.id) {
      this.loading.show();
      localStorage.languageIdNumber = lang.id;
      localStorage.languageCodeString = lang.code;
      localStorage.appDirectionString = lang.direction;
      //this.appCartService.emptyCart();
      //this.appRecentProductsService.emptyRecentViewed();
      setTimeout(() => {
        window.location.reload();
        this.loading.hide();
      }, 900);
    }
  }
  getSelectedColor(l) {
    if (l.id == this.config.languageIdNumber) {
      return 'primary'
    }
  }
  //close modal
  dismiss() {
    this.modalCont.dismiss();
  }

  ngOnInit() {
  }

}
