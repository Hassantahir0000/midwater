import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { SignUpPage } from '../sign-up/sign-up.page';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';
import { PhoneLoginPage } from '../phone-login/phone-login.page';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppCartService } from 'src/services/app-cart/app-cart.service';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppAlertService } from 'src/services/app-alert/app-alert.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppOrderService } from 'src/services/app-order/app-order.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Plugins } from '@capacitor/core'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formData = { email: '', password: '' };
  signUpformData = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirm_password: '',
    status: 1
  };
  errorMessage = '';
  hideGuestLogin: true;
  topSegmentsString = "signIn"
  constructor(

    public config: ConfigService,
    public modalCtrl: ModalController,
    public loading: LoadingService,
    public appCartService: AppCartService,
    public shared: SharedDataService,
    public navCtrl: NavController,
    public appEventsService: AppEventsService,
    public navParams: NavParams,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService,
    public appAlertService: AppAlertService,
    public appUserService: AppUserService,
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) {
    this.hideGuestLogin = navParams.get('hideGuestLogin');
    this.shared.currentOpenedModel = this;
  }

  async openForgetPasswordPage() {
    let modal = await this.modalCtrl.create({
      component: ForgotPasswordPage,
    });
    return await modal.present();
  }

  login() {
    let info = this.formData;

    if (this.appUserService.checkIfGuestSessionIsAvailable()) {
      info = Object.assign({ session_id: this.appUserService.getGuestSession() }, info)
    }

    this.appHttpService.postHttp('customer_login', info, true).then((data: any) => {

      this.appUserService.login(data);
      this.dismiss();

    });
  }

  signUp() {
    let info = this.signUpformData

    if (this.appUserService.checkIfGuestSessionIsAvailable()) {
      info = Object.assign({ session_id: this.appUserService.getGuestSession() }, info)
    }

    this.appHttpService.postHttp('customer_register', info, true).then((data: any) => {
      this.appUserService.login(data);
      this.dismiss();
    });
  }

  facebookLogin() {
    this.fb.getLoginStatus().then((res: any) => {
      if (res.status == 'connected') {
        console.log("user connected already" + res.authResponse.accessToken);
        this.createAccount(res.authResponse.accessToken, 'fb');

      }
      else {
        console.log("USer Not login ");
        this.fb.login(['public_profile', 'email'])
          .then((res: FacebookLoginResponse) => {
            // this.alert.show('Logged into Facebook!' + JSON.stringify(res));
            console.log("successfully login ");
            this.createAccount(res.authResponse.accessToken, 'fb');
          })
          .catch(e => this.appAlertService.showAlert('Error logging into Facebook' + JSON.stringify(e)));
      }
    }).catch(e => this.appAlertService.showAlert('Error Check Login Status Facebook' + JSON.stringify(e)));
  }

  async openAppleSignIn() {
    const { SignInWithApple } = Plugins;

    SignInWithApple.Authorize()
      .then(async (res) => {
        if (res.response && res.response.identityToken) {
          this.createAccount(res.response, 'apple');
          this.appAlertService.showAlert(JSON.stringify(res.response))
        } else {
          this.presentAlert();
        }
      })
      .catch((response) => {
        this.presentAlert();
      });
    // let info = await Device.getInfo();
    // let options: SignInWithAppleOptions = {
    //   clientId: info.appId,
    //   redirectURI: this.config.urlString,
    //   // scopes: 'email name',
    //   //  state: '12345',
    //   //  nonce: 'nonce',
    // };
    // SignInWithApple.authorize(options)
    //   .then((result: SignInWithAppleResponse) => {
    //     // Handle user information
    //     // Validate token with server and create new session
    //     this.createAccount(result, 'apple');

    //   })
    //   .catch(error => {
    //     // Handle error
    //   });

    // {
    //   "response": {
    //     "email": "foo@bar.com",
    //     "identityToken": "importantToken",
    //     "familyName": "Grimm",
    //     "user": "AppleUserId",
    //     "givenName": "Simon",
    //     "authorizationCode": "authCode"
    //   }
    // }


  }

  presentAlert() {
    this.appAlertService.showAlertWithTitle("Please try again later", "Login Failed")
  }

  googleLogin() {
    this.loading.autoHide(500);
    this.googlePlus.login({})
      .then(res => {
        //  alert(JSON.stringify(res))
        this.createAccount(res, 'google');
      })
      .catch(err => this.appAlertService.showAlert(JSON.stringify(err)));
  }

  //============================================================================================  
  //creating new account using function facebook or google details 
  createAccount(info, type) {
    // alert(info);
    var dat: { [k: string]: any } = {};
    var url = '';
    if (type == 'fb') {
      url = 'facebookregistration';
      dat.access_token = info;
    }
    else if (type == 'phone') {
      url = 'phoneregistration';
      dat.phone = info;
    }
    else {
      url = 'googleregistration';
      dat = info;
    }
    this.appHttpService.postHttp(url, dat, true).then((data: any) => {
      // alert("data get");
      if (data.success == 1) {
        this.appUserService.login(data.data[0]);
        //alert('login');
        // this.shared.showAlertWithTitle("<h3>Your Account has been created successfully !</h3><ul><li>Your Email: "
        //   + "<span>" + this.shared.customerData.email + "</span>" + "</li><li>Your Password: "
        //   + "<span>" + this.shared.customerData.password + "</span>" +
        //   " </li></ul><p>You can login using this Email and Password.<br>You can change your password in Menu -> My Account</p>", "Account Information");
        //  $ionicSideMenuDelegate.toggleLeft();
        this.appToastService.toast(data.message);
        this.dismiss();

      }
      else if (data.success == 2) {
        this.appUserService.login(data.data[0]);
        //  alert("login with alreday");
        this.appToastService.toast(data.message);
        this.dismiss();

      }

    }, error => {
      this.loading.hide();
      this.appAlertService.showAlert("error " + JSON.stringify(error));
      // console.log("error " + JSON.stringify(error));
    });
  };

  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {

  }
}
