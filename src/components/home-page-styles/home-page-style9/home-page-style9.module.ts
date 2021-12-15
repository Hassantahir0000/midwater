import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle9Component } from './home-page-style9.component';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';
import { bannerModule } from 'src/components/banner/banner.module';
import { homeSegmentsModule } from 'src/components/home-segments/home-segments.module';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';

@NgModule({
  declarations: [
    HomePageStyle9Component
  ],
  exports: [
    HomePageStyle9Component
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule,
    homeProductsListModule,
    productSliderModule,
    bannerModule,
    homeSegmentsModule,
  ],
})
export class HomePageStyle9Module { }
