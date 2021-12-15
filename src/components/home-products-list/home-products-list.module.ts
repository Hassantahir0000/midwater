import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { HomeProductsListComponent } from './home-products-list.component';
import { productCardModule } from '../product-card/product-card.module';

@NgModule({
  declarations: [
    HomeProductsListComponent,
  ],
  exports: [
    HomeProductsListComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    productCardModule
  ],
})
export class homeProductsListModule { }
