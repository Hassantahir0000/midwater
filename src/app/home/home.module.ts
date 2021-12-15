import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { productCardModule } from 'src/components/product-card/product-card.module';
import { bannerModule } from 'src/components/banner/banner.module';
import { homeProductsListModule } from 'src/components/home-products-list/home-products-list.module';
import { productSliderModule } from 'src/components/products-slider/product-slider.module';
import { homeSegmentsModule } from 'src/components/home-segments/home-segments.module';
import { categoryPageStyle1Module } from 'src/components/categories-page-styles/categories-page-style1/categories-page-style1.module';
import { categoryPageStyle5Module } from 'src/components/categories-page-styles/categories-page-style5/categories-page-style5.module';
import { categoryPageStyle3Module } from 'src/components/categories-page-styles/categories-page-style3/categories-page-style3.module';
import { NoRecordFoundModule } from 'src/components/no-record-found/no-record-found.module';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { HomePageStyle1Module } from 'src/components/home-page-styles/home-page-style1/home-page-style1.module';
import { HomePageStyle10Module } from 'src/components/home-page-styles/home-page-style10/home-page-style10.module';
import { HomePageStyle2Module } from 'src/components/home-page-styles/home-page-style2/home-page-style2.module';
import { HomePageStyle3Module } from 'src/components/home-page-styles/home-page-style3/home-page-style3.module';
import { HomePageStyle4Module } from 'src/components/home-page-styles/home-page-style4/home-page-style4.module';
import { HomePageStyle6Module } from 'src/components/home-page-styles/home-page-style6/home-page-style6.module';
import { HomePageStyle7Module } from 'src/components/home-page-styles/home-page-style7/home-page-style7.module';
import { HomePageStyle9Module } from 'src/components/home-page-styles/home-page-style9/home-page-style9.module';
import { HomePageStyle5Module } from 'src/components/home-page-styles/home-page-style5/home-page-style5.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle8Module } from 'src/components/home-page-styles/home-page-style8/home-page-style8.module';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HomePageStyle1Module,
    HomePageStyle2Module,
    HomePageStyle3Module,
    HomePageStyle4Module,
    HomePageStyle5Module,
    HomePageStyle6Module,
    HomePageStyle7Module,
    HomePageStyle8Module,
    HomePageStyle9Module,
    HomePageStyle10Module
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule { }
