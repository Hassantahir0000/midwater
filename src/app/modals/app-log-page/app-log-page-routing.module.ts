import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLogPagePage } from './app-log-page.page';

const routes: Routes = [
  {
    path: '',
    component: AppLogPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLogPagePageRoutingModule {}
