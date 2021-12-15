import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { AddressInfoCardComponent } from './address-info-card.component';

@NgModule({
  declarations: [
    AddressInfoCardComponent,
  ],
  exports: [
    AddressInfoCardComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
})
export class AddressInfoCardModule { }
