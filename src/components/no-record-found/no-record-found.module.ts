import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/pipes/pipes.module';
import { NoRecordFoundComponent } from './no-record-found.component';

@NgModule({
  declarations: [
    NoRecordFoundComponent,
  ],
  exports: [
    NoRecordFoundComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
})
export class NoRecordFoundModule { }
