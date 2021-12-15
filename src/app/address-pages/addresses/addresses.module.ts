import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressesPage } from './addresses.page';

// For Translation Language
import { PipesModule } from 'src/pipes/pipes.module';
import { AddShippingAddressModule } from 'src/components/add-shipping-address/add-shipping-address-component.module';
import { userAddressesModule } from 'src/components/user-addresses/user-addresses-component.module';

const routes: Routes = [
  {
    path: '',
    component: AddressesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    AddShippingAddressModule,
    userAddressesModule
  ],
  declarations: [AddressesPage]
})
export class AddressesPageModule { }
