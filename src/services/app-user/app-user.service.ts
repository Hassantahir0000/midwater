import { Injectable } from '@angular/core'
import { AppStorageService } from '../app-storage/app-storage.service'
import { AppLogService } from '../app-log/app-log.service'
//import { AppPushNotificationService } from '../app-push-notification/app-push-notification.service'
import { LoadingService } from '../loading/loading.service'
import { AppEventsService } from '../app-events/app-events.service'
import { AppToastService } from '../app-toast/app-toast.service'
import { ConfigService } from '../config/config.service'

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  public customerData: { [k: string]: any } = {}
  public guestSessionString: string = ""
  constructor(
    public storage: AppStorageService,
    public loading: LoadingService,
    //public appPushNotificationService: AppPushNotificationService,
    public appLogService: AppLogService,
    public appEventsService: AppEventsService,
    public appToastService: AppToastService,
    public config: ConfigService
  ) {
    this.initalizeCustomerData()
  }

  initalizeCustomerData() {
    //getting logged in customer data 
    // this.storage.get('customerData').then((val) => {
    //   if (val != null || val != undefined)
    //     this.login(val)
    // })
    //console.log(localStorage.customerData)
    if (localStorage.customerData == undefined || localStorage.customerData == 'undefined') { }
    else this.login(JSON.parse(localStorage.customerData))
  }

  login(data) {
    this.customerData.id = data.id
    this.customerData.firstName = data.first_name
    this.customerData.lastName = data.last_name
    this.customerData.email = data.email
    this.customerData.token = data.token
    localStorage.customerData = JSON.stringify(data)
    console.log(this.customerData)
    this.appEventsService.publish('userLogin', "")
    this.setGuestSession("")
    //this.storage.set('customerData', data)
  }
  updateUserInfo(newData) {
    let oldData = JSON.parse(localStorage.customerData)
    this.customerData.firstName = oldData.first_name = newData.customer_first_name
    this.customerData.lastName = oldData.last_name = newData.customer_last_name
    this.customerData.email = oldData.email = newData.customer_email
    localStorage.customerData = JSON.stringify(oldData)
  }
  logOut() {
    this.removeCustomerData()
    this.appEventsService.publish('userLogout', "");
    // this.fb.logout()
  }
  removeCustomerData() {
    this.customerData = {}
    localStorage.customerData = undefined
    //this.storage.set('customerData', this.customerData)
  }

  getGuestSession() {
    return this.guestSessionString
  }
  checkIfGuestSessionIsAvailable() {
    if (this.guestSessionString != "")
      return true
    else
      return false
  }
  setGuestSession(value) {
    this.guestSessionString = value
  }

  whoIsUser() {
    let result = ""
    if (this.customerData.id == undefined) result = "guest"
    else result = "customer"
    return result
  }

  getCustomerToken() {
    return this.customerData.token
  }

  userIsLogedIn() {
    if (this.whoIsUser() == "customer")
      return true
    else
      return false
  }
}
