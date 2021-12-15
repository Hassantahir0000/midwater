import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductListCardComponent } from './product-list-card.component';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';

@NgModule({
  declarations: [
    ProductListCardComponent
  ],
  exports: [
    ProductListCardComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    ImageValidateDirectiveModule
  ],
})
export class productListCardModule { }
