import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppTranslationService } from '../app-translation/app-translation.service';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor(
    private toastCtrl: ToastController,
    public appTranaltionService: AppTranslationService
  ) {

  }
  toast(msg, time = 3500) {
    this.appTranaltionService.translateString(msg).then(async (res: string) => {
      const toast = await this.toastCtrl.create({
        message: res,
        duration: time,
        position: 'bottom'
      });
      toast.present();
    });
  }
  toastError(msg, time = 3500) {
    this.appTranaltionService.translateString(msg).then(async (res: string) => {
      const toast = await this.toastCtrl.create({
        message: res,
        duration: time,
        position: 'bottom',
        color: "danger"
      });
      toast.present();
    });
  }
  toastMiddle(msg) {
    this.appTranaltionService.translateString(msg).then(async (res: string) => {
      let toast = await this.toastCtrl.create({
        message: res,
        duration: 3500,
        position: 'middle'
      });
      toast.present();
    });
  }
  toastWithCloseButton(msg) {
    this.appTranaltionService.translateString(msg).then(async (res: string) => {
      let toast = await this.toastCtrl.create({
        message: res,
        keyboardClose: true,
        position: 'middle',
        buttons: [
          {
            text: 'X',
            role: 'cancel',
          }
        ]
      });
      toast.present();
    });
  }
  toastErrorWithCloseButton(msg) {
    this.appTranaltionService.translateString(msg).then(async (res: string) => {
      let toast = await this.toastCtrl.create({
        message: res,
        keyboardClose: true,
        position: 'middle',
        color: "danger",
        buttons: [
          {
            text: 'X',
            role: 'cancel',
          }
        ]
      });
      toast.present();
    });
  }

}
