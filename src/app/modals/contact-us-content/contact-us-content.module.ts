import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsContentPageRoutingModule } from './contact-us-content-routing.module';

import { ContactUsContentPage } from './contact-us-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactUsContentPageRoutingModule
  ],
  declarations: [ContactUsContentPage]
})
export class ContactUsContentPageModule {}
