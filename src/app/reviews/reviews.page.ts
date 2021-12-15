import { Component, OnInit, ApplicationRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavController, ModalController, IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { LoginPage } from '../modals/login/login.page';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppLogService } from 'src/services/app-log/app-log.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  @ViewChild(IonRefresher, { static: false }) ionRefresher: IonRefresher;
  pageNumber = 1;
  reviewsArray = [];
  id;
  average;
  r1 = null;
  r2 = null;
  r3 = null;
  r4 = null;
  r5 = null;
  httpLoading = false
  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private applicationRef: ApplicationRef,
    public config: ConfigService,
    public appHttpService: AppHttpService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    public appLogService: AppLogService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  pullRefresh() {
    this.pageNumber = 1
    this.getProductReviews()
  }
  showHideContent(id, type) {
    var element = document.getElementById(id);
    if (type == "show") {
      document.getElementById("a" + id).style.whiteSpace = "normal";
      document.getElementById("more" + id).style.display = "none";
      document.getElementById("less" + id).style.display = "unset";
    }
    else {
      document.getElementById("a" + id).style.whiteSpace = "nowrap";
      document.getElementById("more" + id).style.display = "unset";
      document.getElementById("less" + id).style.display = "none";
    }
  }
  //===============================================================================================================================
  getProductReviews() {
    let url = "review"
    url += "?limit=" + this.config.perPageNumber
    url += "&product_id=" + this.id
    url += "&language_id=" + this.config.languageIdNumber
    url += "&customer=1"
    url += "&currency=" + this.config.currencyIdNumber

    if (this.pageNumber == 1) { this.httpLoading = true }
    this.appHttpService.getHttp(url, true).then((data: any) => {

      let dat = data
      this.infinite.complete()
      if (this.pageNumber == 1) {
        this.reviewsArray = []
        this.httpLoading = false
      }
      if (dat.length != 0) for (let value of dat) this.reviewsArray.push(value)
      if (dat.length < this.config.perPageNumber) this.infinite.disabled = true
      this.pageNumber++
      this.ionRefresher.complete()
      this.calculateAll();
    });
  }
  //===============================================================================================================================
  async openReviewsPage() {
    this.navCtrl.navigateForward("/add-review/" + this.id);
  }
  //===============================================================================================================================
  // <!-- 2.0 updates -->
  totalRating() {
    let total = 0;
    for (let value of this.reviewsArray) {
      total = total + value.rating;
    }

    let result = total;
    if (total == 0) result = 0;
    return result;
  }
  calculateAll() {

    let total2 = 0;
    for (let value of this.reviewsArray) {
      total2 = total2 + value.rating;
    }
    this.average = (total2 / this.reviewsArray.length);
    if (this.reviewsArray.length == 0) this.average = 0;

    let r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0;
    let total = this.reviewsArray.length;
    for (let value of this.reviewsArray) {
      if (value.rating == 1) r1++;
      if (value.rating == 2) r2++;
      if (value.rating == 3) r3++;
      if (value.rating == 4) r4++;
      if (value.rating == 5) r5++;
      console.log(value.rating);
    }
    console.log();
    this.r1 = (100 / total) * r1; if (r1 == 0) this.r1 = 0;
    this.r2 = (100 / total) * r2; if (r2 == 0) this.r2 = 0;
    this.r3 = (100 / total) * r3; if (r3 == 0) this.r3 = 0;
    this.r4 = (100 / total) * r4; if (r4 == 0) this.r4 = 0;
    this.r5 = (100 / total) * r5; if (r5 == 0) this.r5 = 0;
  }

  ngOnInit() {
    this.pullRefresh();
  }
  ionViewWillEnter() {

  }
  goBack() {
    this.navCtrl.back();
  }
}


