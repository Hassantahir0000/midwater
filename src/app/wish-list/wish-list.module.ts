import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WishListPage } from './wish-list.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { productCardModule } from 'src/components/product-card/product-card.module';
import { NoRecordFoundModule } from 'src/components/no-record-found/no-record-found.module';

const routes: Routes = [
  {
    path: '',
    component: WishListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    productCardModule,
    NoRecordFoundModule
  ],
  declarations: [WishListPage]
})
export class WishListPageModule { }
