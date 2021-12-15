import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SelectCountryPage } from 'src/app/modals/select-country/select-country.page';
import { SelectZonesPage } from 'src/app/modals/select-zones/select-zones.page';
import { AppToastService } from 'src/services/app-toast/app-toast.service';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.scss'],
})
export class AddShippingAddressComponent implements OnInit {

  formChangesSubscription: any;
  @ViewChild('form', { static: true }) ngForm: NgForm;

  @Output() formIschanged = new EventEmitter();

  @Input('editData') editData;//product data

  public delivery_first_name = ""
  public delivery_last_name = ""
  public delivery_street_aadress = ""
  public delivery_city = ""
  public delivery_postcode = ""
  public delivery_country = ""
  public delivery_state = ""
  public delivery_country_name = ""
  public delivery_state_name = ""
  public delivery_phone = ""


  constructor(
    public modalCtrl: ModalController,
    public appToastService: AppToastService,
    public config: ConfigService
  ) {

  }


  async openCountries() {

    let modal = await this.modalCtrl.create({
      component: SelectCountryPage
    });
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        this.delivery_country = data.data.country_id
        this.delivery_country_name = data.data.country_name
      }
    });
    return await modal.present();
  }

  async openStates() {
    if (this.delivery_country == "") {
      this.appToastService.toastError("please select country")
      return;
    }
    let modal = await this.modalCtrl.create({
      component: SelectZonesPage,
      componentProps: { id: this.delivery_country }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        this.delivery_state = data.data.id
        this.delivery_state_name = data.data.name
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    if (this.editData != null)
      this.setFormDataForEdit()
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(x => {
      this.ngForm.form.value.delivery_state_name = this.delivery_state_name
      this.ngForm.form.value.delivery_country_name = this.delivery_country_name
      this.ngForm.form.value.delivery_state = this.delivery_state
      this.ngForm.form.value.delivery_country = this.delivery_country
      this.formIschanged.emit(this.ngForm.form)
    })
  }
  setFormDataForEdit() {
    this.delivery_first_name = this.editData.customer.customer_first_name
    this.delivery_last_name = this.editData.customer.customer_last_name
    this.delivery_street_aadress = this.editData.street_address
    this.delivery_city = this.editData.city
    this.delivery_postcode = this.editData.postcode
    this.delivery_country = this.editData.country_id.country_id
    this.delivery_state = this.editData.state_id.id
    this.delivery_country_name = this.editData.country_id.country_name
    this.delivery_state_name = this.editData.state_id.name
    this.delivery_phone = this.editData.phone
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
