import { NgModule } from '@angular/core';
import { ImageValidateDirective } from './image-validate.directive';


@NgModule({
  declarations: [
    ImageValidateDirective,
  ],
  exports: [
    ImageValidateDirective
  ],
  imports: [
  ],
})
export class ImageValidateDirectiveModule { }
