import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAttributesModalPage } from './product-attributes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAttributesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAttributesModalPageRoutingModule {}
