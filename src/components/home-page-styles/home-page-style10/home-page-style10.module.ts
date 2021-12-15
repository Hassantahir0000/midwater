import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
import { HomePageStyle10Component } from './home-page-style10.component';

@NgModule({
  declarations: [
    HomePageStyle10Component
  ],
  exports: [
    HomePageStyle10Component
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
export class HomePageStyle10Module { }
