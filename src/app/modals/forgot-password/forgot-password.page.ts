import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  formData = {
    email: '',
  };
  errorMessage = '';
  constructor(
    public loading: LoadingService,
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public modalCtrl: ModalController,) {
  }
  forgetPassword() {
    this.errorMessage = '';
    this.appHttpService.postHttp('forget_password', this.formData, true).then((data: any) => {
      this.dismiss();
      this.appToastService.toastMiddle("Email Sent Successfully!");
      // if (data.success == 1) {
      //   this.appToastService.toast(data.message);
      //   this.dismiss();
      // }
      // if (data.success == 0) {
      //   this.errorMessage = data.message;
      //   this.appToastService.toast(data.message);
      // }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
