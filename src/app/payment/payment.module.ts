import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { AppProgressBarModule } from 'src/components/app-progress-bar/app-progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    PipesModule,
    AppProgressBarModule,
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
