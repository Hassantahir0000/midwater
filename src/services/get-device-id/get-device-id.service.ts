import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppLogService } from '../app-log/app-log.service';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class GetDeviceIdService {
  deviceId: any = "";

  constructor(
    public platform: Platform,
    public appLogService: AppLogService
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.setRealDeviceId();
      }
    });
  }
  public realDeviceIdUpdatedCounter = 0;
  async setRealDeviceId() {
    const info = await Device.getId();
    this.realDeviceIdUpdatedCounter++;
    this.deviceId = info.uuid;
  }
  getDeviceId() {
    let id = "";
    if (this.realDeviceIdUpdatedCounter == 0) {
      let d = new Date();
      id = d.getTime().toString();
    }
    else {
      id = this.deviceId;
    }
    return id;
  }

}
