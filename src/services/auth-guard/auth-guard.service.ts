import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { IntroPage } from 'src/app/intro/intro.page';
import { LoginPage } from 'src/app/modals/login/login.page';
import { AppLogService } from '../app-log/app-log.service';
import { AppOrderService } from '../app-order/app-order.service';
import { AppUserService } from '../app-user/app-user.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public modalCtrl: ModalController,
    public appUserService: AppUserService,
    public appOrderService: AppOrderService,
    private navCtrl: NavController,
    public config: ConfigService,
    public appLogService: AppLogService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.appUserService.userIsLogedIn()) {
      if (this.appUserService.whoIsUser() == "guest") {
        this.openLoginPage(route.data.hideGuestLogin)
        return false
      }
      else if (this.appUserService.checkIfGuestSessionIsAvailable()) {
        return true;
      }
      else {
        this.openLoginPage(route.data.hideGuestLogin)
      }
    }
    else
      return true;
  }

  async openLoginPage(value) {

    console.log(value);

    let val = value;
    if (value == undefined)
      val = true;

    let modal = await this.modalCtrl.create({
      component: LoginPage,
      componentProps: {
        'hideGuestLogin': val
      }
    });
    return await modal.present();
  }

  async openIntroPage() {
    let modal = await this.modalCtrl.create({
      component: IntroPage,
    });
    return await modal.present();
  }
}
