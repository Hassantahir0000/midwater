import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { UserAddressesComponent } from './user-addresses.component';
import { AddressInfoCardModule } from '../address-info-card/address-info-card.module';

@NgModule({
  declarations: [
    UserAddressesComponent,
  ],
  exports: [
    UserAddressesComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    AddressInfoCardModule
  ],
})
export class userAddressesModule { }
