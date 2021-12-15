import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading/loading.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { FirebasePhoneAuthService } from 'src/services/firebase-phone-auth/firebase-phone-auth.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
})
export class PhoneLoginPage implements OnInit {

  formData = {
    customers_telephone: '',
  };
  errorMessage = '';
  constructor(
    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public shared: SharedDataService,
    public appEventsService: AppEventsService,
    public firebasePhoneAuthService: FirebasePhoneAuthService,
    public appOrderService: AppOrderService
  ) {
    this.shared.currentOpenedModel = this;
    let loginWithPhoneNumber = this.appEventsService.subscribe("loginWithPhoneNumber");
    loginWithPhoneNumber.subscriptions.add(loginWithPhoneNumber.event.subscribe(data => {
      // if (this.appOrderService.orderDetails.guest_status == 0) {
      //   this.dismiss();
      // }
    }));
  }
  login() {
    if (this.config.phoneAuthWithFirebaseBool)
      this.firebasePhoneAuthService.verifyPhoneNumber(this.formData.customers_telephone);
  }
  ngAfterViewInit() {
    if (this.config.phoneAuthWithFirebaseBool)
      this.firebasePhoneAuthService.createRecaptcha();
  }
  async dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
