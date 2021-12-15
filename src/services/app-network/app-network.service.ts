import { Injectable } from '@angular/core';
import { AppAlertService } from '../app-alert/app-alert.service';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class AppNetworkService {

  constructor(
    public appAlertService: AppAlertService,
  ) {
    this.checkInternetConnection();
  }

  checkInternetConnection() {
    let handler = Network.addListener('networkStatusChange', async (status) => {
      // Get the current network status
      if (status.connected == false) {
        this.appAlertService.showAlertWithTitle("Please Connect to the Internet", "Disconnected");
      }
      else {
        //window.location.reload();
        //this.appAlertService.showAlertWithTitle("Network connected Reloading Data" + '...', "Connected");
      }
      console.log("Network status changed", status);
    });
  }
}
