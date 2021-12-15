import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { productCardModule } from '../product-card/product-card.module';
import { HomeSegmentsComponent } from './home-segments.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeSegmentsComponent
  ],
  exports: [
    HomeSegmentsComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    productCardModule
  ],
})
export class homeSegmentsModule { }
