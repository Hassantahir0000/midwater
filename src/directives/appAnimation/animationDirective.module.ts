import { NgModule } from '@angular/core';
import { AnimationDirective } from './animation.directive';

@NgModule({
  declarations: [
    AnimationDirective,
  ],
  exports: [
    AnimationDirective
  ],
  imports: [
  ],
})
export class AnimationDirectiveModule { }
