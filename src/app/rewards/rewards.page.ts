import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, NavController } from '@ionic/angular';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  @ViewChild(IonRefresher, { static: false }) ionRefresher: IonRefresher;
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService) { }
  goBack() {
    this.navCtrl.back()
  }
  ionViewDidEnter() {
    this.pullRefresh()
  }
  pullRefresh() {
    this.getProducts()
  }
  public pointsArray = []
  getProducts() {
    let url = "points"
    url += "?language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber

    this.appHttpService.getHttp(url, true).then((data: any) => {
      let dat = data
      this.pointsArray = dat
      this.ionRefresher.complete()
    })
  }

  redeemPoints() {
    let url = "redeem"
    url += "?language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber

    this.appHttpService.postHttp(url, {}, true).then((data: any) => {
      let dat = data
      this.appToastService.toastMiddle("Redeem Successfull")
    })
  }
  ngOnInit() {
  }
  rewardPoints() {
    let total = 0
    this.pointsArray.forEach(element => {
      total += element.points
    });
    return total
  }
}
