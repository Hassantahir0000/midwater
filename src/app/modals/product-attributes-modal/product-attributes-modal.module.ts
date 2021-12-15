import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAttributesModalPageRoutingModule } from './product-attributes-modal-routing.module';

import { ProductAttributesModalPage } from './product-attributes-modal.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ImageValidateDirectiveModule } from 'src/directives/imageValidate/imageValidate.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductAttributesModalPageRoutingModule,
    PipesModule,
    ImageValidateDirectiveModule
  ],
  declarations: [ProductAttributesModalPage]
})
export class ProductAttributesModalPageModule { }
