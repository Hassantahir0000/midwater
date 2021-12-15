import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle3Component } from './home-page-style3.component';
import { bannerModule } from 'src/components/banner/banner.module';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';

@NgModule({
  declarations: [
    HomePageStyle3Component
  ],
  exports: [
    HomePageStyle3Component
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule,
    productSliderModule,
    homeProductsListModule,
    bannerModule
  ],
})
export class HomePageStyle3Module { }
