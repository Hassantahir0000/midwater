import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPage } from './product-detail.page';

import { PipesModule } from 'src/pipes/pipes.module';
import { productCardModule } from 'src/components/product-card/product-card.module';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailPage
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
    AnimationDirectiveModule,
    ImageValidateDirectiveModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
