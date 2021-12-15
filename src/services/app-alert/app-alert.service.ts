import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppLogService } from '../app-log/app-log.service';
import { AppTranslationService } from '../app-translation/app-translation.service';

@Injectable({
  providedIn: 'root'
})
export class AppAlertService {

  constructor(
    public alertCtrl: AlertController,
    public appTranslationService: AppTranslationService,
    public appLogService: AppLogService 
  ) { }
  //=================================================

  showAlert(text) {
    this.appTranslationService.translateArray([text, "ok", "Alert"]).then(async (res) => {
      console.log(res);
      const alert = await this.alertCtrl.create({
        header: res["Alert"],
        message: res[text],
        buttons: [res["ok"]]
      });
      await alert.present();
    });
  }

  showAlertWithTitle(text, title) {
    this.appTranslationService.translateArray([text, "ok", title]).then(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res[title],
        message: res[text],
        buttons: [res["ok"]]
      });
      await alert.present();
    });
  }
}
