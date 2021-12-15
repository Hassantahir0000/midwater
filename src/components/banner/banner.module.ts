import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnimationDirectiveModule } from 'src/directives/appAnimation/animationDirective.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';
//for home banner
import { BannerComponent } from '../banner/banner.component';

@NgModule({
  declarations: [
    BannerComponent,
  ],
  exports: [
    BannerComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    AnimationDirectiveModule,
    ImageValidateDirectiveModule
  ],
})
export class bannerModule { }
