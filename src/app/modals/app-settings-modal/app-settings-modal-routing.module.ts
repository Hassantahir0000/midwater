import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppSettingsModalPage } from './app-settings-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AppSettingsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsModalPageRoutingModule {}
