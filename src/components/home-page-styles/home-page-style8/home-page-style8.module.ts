import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle8Component } from './home-page-style8.component';
import { bannerModule } from 'src/components/banner/banner.module';
import { categoryPageStyle3Module } from 'src/components/categories-page-styles/categories-page-style3/categories-page-style3.module';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';

@NgModule({
  declarations: [
    HomePageStyle8Component
  ],
  exports: [
    HomePageStyle8Component
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
    categoryPageStyle3Module,
  ],
})
export class HomePageStyle8Module { }
