import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { RewardsPage } from './rewards.page';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: RewardsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RewardsPage]
})
export class RewardsPageModule { }
