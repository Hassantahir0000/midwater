import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle5Component } from './home-page-style5.component';
import { bannerModule } from 'src/components/banner/banner.module';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';
import { homeSegmentsModule } from 'src/components/home-segments/home-segments.module';

@NgModule({
  declarations: [
    HomePageStyle5Component
  ],
  exports: [
    HomePageStyle5Component
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
    bannerModule,
    homeSegmentsModule
  ],
})
export class HomePageStyle5Module { }
