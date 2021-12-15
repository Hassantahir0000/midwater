import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  myAccountData = {
    first_name: '',
    last_name: '',
    password_confirmation: '',
    password: ''
  };


  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public loading: LoadingService,
    public appUserService: AppUserService,
    public navCtrl: NavController,
    public appLogService: AppLogService) {
  }
  goBack() {
    this.navCtrl.back()
  }
  //============================================================================================  
  //function updating user information
  updateInfo() {
    let info = this.myAccountData;
    this.appHttpService.putHttp('profile/' + this.appUserService.customerData.id, info, true, true).then((data: any) => {
      this.myAccountData.first_name = data.customer_first_name
      this.myAccountData.last_name = data.customer_last_name
      this.myAccountData.password = "";
      this.myAccountData.password_confirmation = "";
      this.appUserService.updateUserInfo(data)
    });
  }
  //============================================================================================

  ionViewWillEnter() {
    this.myAccountData.first_name = this.appUserService.customerData.firstName
    this.myAccountData.last_name = this.appUserService.customerData.lastName
  }

  ngOnInit() {
  }

}
