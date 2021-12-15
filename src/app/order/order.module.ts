import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { AppProgressBarModule } from 'src/components/app-progress-bar/app-progress-bar.module';
import { productListCardModule } from 'src/components/product-list-card/product-list-card.module';
import { AddressInfoCardModule } from 'src/components/address-info-card/address-info-card.module';


const routes: Routes = [
  {
    path: '',
    component: OrderPage
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
    productListCardModule,
    AddressInfoCardModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
