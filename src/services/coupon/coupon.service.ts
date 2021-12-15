import { Injectable } from '@angular/core';
import { AppAlertService } from '../app-alert/app-alert.service';
import { AppCartService } from '../app-cart/app-cart.service';
import { AppHttpService } from '../app-http/app-http.service';
import { AppToastService } from '../app-toast/app-toast.service';
import { SharedDataService } from '../shared-data/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public appToastService: AppToastService) {

  }


}
