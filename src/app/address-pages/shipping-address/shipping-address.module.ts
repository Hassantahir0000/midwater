import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShippingAddressPage } from './shipping-address.page';

// For Translation Language
import { PipesModule } from 'src/pipes/pipes.module';
import { AppProgressBarModule } from 'src/components/app-progress-bar/app-progress-bar.module';
import { AddShippingAddressModule } from 'src/components/add-shipping-address/add-shipping-address-component.module';
import { userAddressesModule } from 'src/components/user-addresses/user-addresses-component.module';

const routes: Routes = [
  {
    path: '',
    component: ShippingAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    AppProgressBarModule,
    AddShippingAddressModule,
    userAddressesModule
  ],
  declarations: [ShippingAddressPage]
})
export class ShippingAddressPageModule { }
