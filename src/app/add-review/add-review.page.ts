import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';

import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {

  rating = null;
  nonce;
  errorMessage = '';
  id;
  formData = { name: '', email: '', description: '' };

  ratingStars = [
    { value: '1', fill: 'star-outline' },
    { value: '2', fill: 'star-outline' },
    { value: '3', fill: 'star-outline' },
    { value: '4', fill: 'star-outline' },
    { value: '5', fill: 'star-outline' }
  ];
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public config: ConfigService,
    private activatedRoute: ActivatedRoute,
    public loading: LoadingService,
    public shared: SharedDataService,
    private applicationRef: ApplicationRef,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public appUserService: AppUserService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.formData.name = this.appUserService.customerData.first_name + " " + this.appUserService.customerData.last_name;
    this.formData.email = this.appUserService.customerData.email;
  }

  addComment() {
    var dat: { [k: string]: any } = {};
    dat.product_id = this.id;
    dat.rating = this.rating;
    dat.languages_id = this.config.languageIdNumber;
    dat.comment = this.formData.description;

    this.appHttpService.postHttp('review', dat, true).then((data: any) => {
      this.appToastService.toast("Thanks for Review!")
      this.navCtrl.pop();
    });

  }

  selectRating(value) {
    this.rating = value;
    for (let v of this.ratingStars) {
      if (v.value <= value) v.fill = 'star';
      else v.fill = 'star-outline';
    }
    this.applicationRef.tick();
  }
  disbaleButton() {
    //this.applicationRef.tick();
    if (this.rating == null) { return true; }
    else if (this.formData.description == "") { return true; }
    else if (this.formData.name == "") { return true; }
    else if (this.formData.email == "") { return true; }
    else { return false; }
  }
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
}
