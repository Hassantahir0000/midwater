import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppLogPagePageRoutingModule } from './app-log-page-routing.module';

import { AppLogPagePage } from './app-log-page.page';
import { AppJsonTreeViewComponent } from 'src/components/app-json-tree-view/app-json-tree-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppLogPagePageRoutingModule
  ],
  declarations: [AppLogPagePage,
    AppJsonTreeViewComponent]
})
export class AppLogPagePageModule { }
