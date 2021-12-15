import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle2Component } from './home-page-style2.component';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';
import { bannerModule } from 'src/components/banner/banner.module';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';

@NgModule({
  declarations: [
    HomePageStyle2Component
  ],
  exports: [
    HomePageStyle2Component
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule,
    productSliderModule,
    bannerModule,
    homeProductsListModule
  ],
})
export class HomePageStyle2Module { }
