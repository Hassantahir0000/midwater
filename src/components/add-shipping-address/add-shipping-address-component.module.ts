import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { AddShippingAddressComponent } from './add-shipping-address.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddShippingAddressComponent
  ],
  exports: [
    AddShippingAddressComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule
  ],
})
export class AddShippingAddressModule { }
