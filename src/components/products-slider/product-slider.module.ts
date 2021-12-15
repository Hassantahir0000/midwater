import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductsSliderComponent } from './products-slider.component';
import { productCardModule } from '../product-card/product-card.module';

@NgModule({
  declarations: [
    ProductsSliderComponent
  ],
  exports: [
    ProductsSliderComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    productCardModule
  ],
})
export class productSliderModule { }
