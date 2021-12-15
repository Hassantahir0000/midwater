
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { AppEventsService } from '../app-events/app-events.service'
import { AppLogService } from '../app-log/app-log.service'
import { AppToastService } from '../app-toast/app-toast.service'
import { ConfigService } from '../config/config.service'
import { GetDeviceIdService } from '../get-device-id/get-device-id.service'
import { GetIpAddressService } from '../get-ip-Address/get-ip-address.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HTTP } from '@ionic-native/http/ngx'
import { LoadingService } from '../loading/loading.service'
import { AppUserService } from '../app-user/app-user.service'


@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  consumerKey: string;
  consumerSecret: string;

  constructor(
    public appEventsService: AppEventsService,
    public getIpAddressService: GetIpAddressService,
    public getDeviceIdService: GetDeviceIdService,
    public config: ConfigService,
    public platform: Platform,
    public appLogService: AppLogService,
    public appToastService: AppToastService,
    public angularHttp: HttpClient,
    private httpNative: HTTP,
    public loading: LoadingService,
    public appUserService: AppUserService
  ) {
  }
  //============================================================================
  onReceiveError200(type, requestUrl, postData = {}, response) {
    let info = "Error : Http : " + type + " : "
    this.appLogService.log(info + requestUrl, postData, response)
    //this.appToastService.toastError(info + requestUrl, response)
    this.appToastService.toastError(response.message)
    console.log(info + requestUrl, postData, response)
  }
  //============================================================================
  onReceiveSuccess(type, requestUrl, postData = {}, response) {
    let info = "Response : Http : " + type + " : "
    this.appLogService.log(info + requestUrl, postData, response)
    //console.log(info + requestUrl, response)
  }
  //============================================================================
  onReceiveErrorNot200(type, requestUrl, postData = {}, response) {
    let info = "Error : Http : " + type + " : "
    console.log(info + requestUrl, postData, response)
    this.appLogService.log(info + requestUrl, postData, response)
    //this.appToastService.toastError(info + requestUrl)
    this.appToastService.toastError(response.error.message)
  }
  //======================================================
  compareStrings(s1, s2) {
    if (s1.toLocaleLowerCase() == s2.toLocaleLowerCase()) return true
    else return false
  }
  //===================================================== Get Request ===================================
  getHeadersForHttp() {
    let headers = {
      'Content-Type': 'application/json',
      'clientid': this.config.clientIdString,
      'clientsecret': this.config.clientSecretString
    };
    if (this.appUserService.whoIsUser() == "customer") {
      let Authorization = "Bearer " + this.appUserService.getCustomerToken()
      headers = Object.assign({ Authorization: Authorization }, headers)
    }
    return headers;
  }

  getHttp(req, loader = false, showAlert = false) {
    let customHeaders = this.getHeadersForHttp()
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      if (loader) this.loading.show()
      if (this.platform.is('cordova')) {
        this.httpNative.get(this.config.urlString + req, {}, customHeaders)
          .then((data: any) => {
            let response = JSON.parse(data.data);
            if (this.compareStrings(response.status, "Error")) {
              this.onReceiveError200("Get", req, {}, response.message)
              if (showAlert) this.appToastService.toastErrorWithCloseButton(response.message)
            }
            else if (this.compareStrings(response.status, "Warning")) {
              this.onReceiveError200("Get", req, {}, response.message)
            }
            else if (this.compareStrings(response.status, "Success")) {
              this.onReceiveSuccess("Get", req, {}, response.data)
              resolve(response.data);
            }
            if (loader) this.loading.hide()
          })
          .catch(error => {
            if (loader) this.loading.hide()
            this.onReceiveErrorNot200("Get", req, {}, error)
          });
      }
      else {
        this.angularHttp.get(this.config.urlString + req, httpOptions).subscribe((data: any) => {
          if (loader) this.loading.hide()
          let response = data;
          if (this.compareStrings(response.status, "Error")) {
            this.onReceiveError200("Get", req, {}, response.message)
          }
          else if (this.compareStrings(response.status, "Warning")) {
            this.onReceiveError200("Get", req, {}, response.message)
          }
          else if (this.compareStrings(response.status, "Success")) {
            this.onReceiveSuccess("Get", req, {}, response.data)
            resolve(response.data);
          }
          if (loader) this.loading.hide()
        }, (error) => {
          if (loader) this.loading.hide()
          this.onReceiveErrorNot200("Get", req, {}, error)
        });
      }
    });
  }
  //================================================ Post Request ===============================================
  postHttp(req, postData, loader = false) {
    let customHeaders = this.getHeadersForHttp()
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      if (loader) this.loading.show()
      if (this.platform.is('cordova')) {
        this.httpNative.setDataSerializer("json");
        this.httpNative.clearCookies()
        this.httpNative.post(this.config.urlString + req, postData, customHeaders)
          .then(data => {
            if (loader) this.loading.hide()
            let response = JSON.parse(data.data);
            if (this.compareStrings(response.status, "Error")) {
              this.onReceiveError200("POST", req, postData, response.message)
            }
            else if (this.compareStrings(response.status, "Warning")) {
              this.onReceiveError200("POST", req, {}, response.message)
            }
            else if (this.compareStrings(response.status, "Success")) {
              this.onReceiveSuccess("POST", req, postData, response.data)
              resolve(response.data);
            }
          })
          .catch(error => {
            console.log(error)
            let er = JSON.parse(error.error);
            if (loader) this.loading.hide()
            this.onReceiveErrorNot200("POST", req, postData, { error: er })
          });
      }
      else {
        this.angularHttp.post(this.config.urlString + req, postData, httpOptions).subscribe((data: any) => {
          if (loader) this.loading.hide()
          let response = data;
          if (this.compareStrings(response.status, "Error")) {
            this.onReceiveError200("POST", req, postData, response.message)
          }
          else if (this.compareStrings(response.status, "Warning")) {
            this.onReceiveError200("POST", req, {}, response.message)
          }
          else if (this.compareStrings(response.status, "Success")) {
            this.onReceiveSuccess("POST", req, postData, response.data)
            resolve(response.data);
          }
        }, (error) => {
          if (loader) this.loading.hide()
          this.onReceiveErrorNot200("POST", req, postData, error)
        });
      }
    });
  }
  //================================================ Post Request ===============================================
  putHttp(req, postData, loader = false, showAlert = false) {
    let customHeaders = this.getHeadersForHttp()
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      if (loader) this.loading.show()
      if (this.platform.is('cordova')) {
        this.httpNative.setDataSerializer("json");
        this.httpNative.clearCookies()
        this.httpNative.put(this.config.urlString + req, postData, customHeaders)
          .then(data => {
            if (loader) this.loading.hide()
            let response = JSON.parse(data.data);
            if (this.compareStrings(response.status, "Error")) {
              this.onReceiveError200("PUT", req, postData, response.message)

            }
            else if (this.compareStrings(response.status, "Warning")) {
              this.onReceiveError200("PUT", req, {}, response.message)
            }
            else if (this.compareStrings(response.status, "Success")) {
              this.onReceiveSuccess("PUT", req, postData, response.data)
              if (showAlert) this.appToastService.toastMiddle(response.message)
              resolve(response.data);
            }
          })
          .catch(error => {

            let er = JSON.parse(error.error);
            if (loader) this.loading.hide()
            this.onReceiveErrorNot200("PUT", req, postData, { error: er })

          });
      }
      else {
        this.angularHttp.put(this.config.urlString + req, postData, httpOptions).subscribe((data: any) => {
          if (loader) this.loading.hide()
          let response = data;
          if (this.compareStrings(response.status, "Error")) {
            this.onReceiveError200("PUT", req, postData, response.message)
          }
          else if (this.compareStrings(response.status, "Warning")) {
            this.onReceiveError200("POST", req, {}, response.message)
          }
          else if (this.compareStrings(response.status, "Success")) {
            this.onReceiveSuccess("PUT", req, postData, response.data)
            if (showAlert) this.appToastService.toastMiddle(response.message)
            resolve(response.data);
          }
        }, (error) => {
          if (loader) this.loading.hide()
          this.onReceiveErrorNot200("PUT", req, postData, error)
        });
      }
    });
  }
  //================================================ delete Request ===============================================
  deleteHttp(req, postData, loader = false) {
    let customHeaders = this.getHeadersForHttp()
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      if (loader) this.loading.show()
      if (this.platform.is('cordova')) {

        let postDataa: { [k: string]: any } = {};

        for (let key in postData) {
          let value = postData[key];
          postDataa[key] = String(value)
        }

        this.httpNative.setDataSerializer("json");
        this.httpNative.clearCookies()
        this.httpNative.delete(this.config.urlString + req, postDataa, customHeaders)
          .then(data => {
            if (loader) this.loading.hide()
            let response = JSON.parse(data.data);
            if (this.compareStrings(response.status, "Error")) {
              this.onReceiveError200("DELETE", req, postData, response.message)
            }
            else if (this.compareStrings(response.status, "Warning")) {
              this.onReceiveError200("DELETE", req, {}, response.message)
            }
            else if (this.compareStrings(response.status, "Success")) {
              this.onReceiveSuccess("DELETE", req, postData, response.data)
              resolve(response.data);
            }
          })
          .catch(error => {

            let er = JSON.parse(error.error);
            if (loader) this.loading.hide()
            this.onReceiveErrorNot200("DELETE", req, postData, { error: er })

          });
      }
      else {
        let options = { headers: customHeaders, params: postData }
        this.angularHttp.delete(this.config.urlString + req, options).subscribe((data: any) => {
          if (loader) this.loading.hide()
          let response = data;
          if (this.compareStrings(response.status, "Error")) {
            this.onReceiveError200("DELETE", req, postData, response.message)
          }
          else if (this.compareStrings(response.status, "Warning")) {
            this.onReceiveError200("DELETE", req, {}, response.message)
          }
          else if (this.compareStrings(response.status, "Success")) {
            this.onReceiveSuccess("DELETE", req, postData, response.data)
            resolve(response.data);
          }
        }, (error) => {
          if (loader) this.loading.hide()
          this.onReceiveErrorNot200("DELETE", req, postData, error)
        });
      }
    });
  }
  //=====================================================================
  angularHttpGet(url) {
    return new Promise(resolve => {
      this.angularHttp.get(url).subscribe((data: any) => {
        this.onReceiveSuccess("GET", url, {}, data)
        resolve(data);
      }, (error) => {
        this.onReceiveErrorNot200("GET", url, {}, error)
      });
    });
  }
}
