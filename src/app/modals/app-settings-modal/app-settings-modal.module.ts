import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppSettingsModalPageRoutingModule } from './app-settings-modal-routing.module';

import { AppSettingsModalPage } from './app-settings-modal.page';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSettingsModalPageRoutingModule,
    PipesModule
  ],
  declarations: [AppSettingsModalPage]
})
export class AppSettingsModalPageModule {}
