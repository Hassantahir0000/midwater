import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyOrderDetailPage } from './my-order-detail.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { AddressInfoCardModule } from 'src/components/address-info-card/address-info-card.module';
import { productListCardModule } from 'src/components/product-list-card/product-list-card.module';

const routes: Routes = [
  {
    path: '',
    component: MyOrderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    productListCardModule,
    AddressInfoCardModule
  ],
  declarations: [MyOrderDetailPage]
})
export class MyOrderDetailPageModule { }
