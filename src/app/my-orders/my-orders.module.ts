import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPage } from './my-orders.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { productListCardModule } from 'src/components/product-list-card/product-list-card.module';
import { NoRecordFoundModule } from 'src/components/no-record-found/no-record-found.module';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersPage
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
    NoRecordFoundModule
  ],
  declarations: [MyOrdersPage]
})
export class MyOrdersPageModule { }
