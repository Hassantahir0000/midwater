import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppProgressBarComponent } from './app-progress-bar.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    AppProgressBarComponent,
  ],
  exports: [
    AppProgressBarComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
})
export class AppProgressBarModule { }
