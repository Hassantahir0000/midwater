import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReviewsPage } from './reviews.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { NoRecordFoundModule } from 'src/components/no-record-found/no-record-found.module';

const routes: Routes = [
  {
    path: '',
    component: ReviewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    NoRecordFoundModule
  ],
  declarations: [ReviewsPage]
})
export class ReviewsPageModule {}
