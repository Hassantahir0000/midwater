import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { CategoriesPageStyle5Component } from './categories-page-style5.component';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';


@NgModule({
  declarations: [
    CategoriesPageStyle5Component
  ],
  exports: [
    CategoriesPageStyle5Component
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule
  ],
})
export class categoryPageStyle5Module { }
