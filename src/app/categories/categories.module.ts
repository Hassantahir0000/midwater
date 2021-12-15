import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CategoriesPage } from './categories.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { categoryPageStyle1Module } from 'src/components/categories-page-styles/categories-page-style1/categories-page-style1.module';
import { categoryPageStyle3Module } from 'src/components/categories-page-styles/categories-page-style3/categories-page-style3.module';
import { categoryPageStyle5Module } from 'src/components/categories-page-styles/categories-page-style5/categories-page-style5.module';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';

import { categoryPageStyle2Module } from 'src/components/categories-page-styles/categories-page-style2/categories-page-style2.module';
import { categoryPageStyle4Module } from 'src/components/categories-page-styles/categories-page-style4/categories-page-style4.module';
import { categoryPageStyle6Module } from 'src/components/categories-page-styles/categories-page-style6/categories-page-style6.module';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    categoryPageStyle1Module,
    categoryPageStyle3Module,
    categoryPageStyle5Module,
    categoryPageStyle2Module,
    categoryPageStyle4Module,
    categoryPageStyle6Module,
    AnimationDirectiveModule,
  ],
  declarations: [
    CategoriesPage]
})
export class CategoriesPageModule { }
