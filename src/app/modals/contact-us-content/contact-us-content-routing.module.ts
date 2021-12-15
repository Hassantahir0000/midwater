import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsContentPage } from './contact-us-content.page';

const routes: Routes = [
  {
    path: '',
    component: ContactUsContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsContentPageRoutingModule {}
