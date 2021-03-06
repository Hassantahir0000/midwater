import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/services/config/config.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { TermServicesPage } from '../term-services/term-services.page';
import { RefundPolicyPage } from '../refund-policy/refund-policy.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  formData = {
    customers_firstname: '',
    customers_lastname: '',
    email: '',
    password: '',
    customers_telephone: '',
  };
  image = "";
  errorMessage = '';
  consumerKeyEncript: any;
  consumerSecretEncript: any;
  constructor(
    public http: HttpClient,
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    public platform: Platform,
    public appHttpService: AppHttpService,
    public appUserService: AppUserService
  ) {
    this.shared.currentOpenedModel = this;
  }
  registerUser() {
    this.errorMessage = '';
    this.loading.show();
    this.appHttpService.postHttp('processregistration', this.formData).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.appUserService.login(data.data[0]);
        this.dismiss();
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }

  async openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }
  async openTermServicesPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage
    });
    return await modal.present();
  }
  async openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage
    });
    return await modal.present();
  }
  async dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
