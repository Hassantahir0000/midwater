import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppAnimationsService {

  constructor(
    public animationCtrl: AnimationController
  ) {

  }

  fadeAnimation(nativElement, duration) {
    const animation = this.animationCtrl.create()
      .addElement(nativElement)
      .duration(duration)
      .iterations(1)
      .fromTo('opacity', '0', '1');;
    animation.play();
  }
  fadeLeaveAnimation(nativElement, duration) {
    const animation = this.animationCtrl.create()
      .addElement(nativElement)
      .duration(duration)
      .iterations(1)
      .fromTo('opacity', '1', '0');;
    animation.play();
  }
  fadeAnimationWithClassName(className, duration) {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.' + className))
      .duration(duration)
      .iterations(1)
      .fromTo('opacity', '0', '1');;
    animation.play();
  }

  slideInAnimation(nativElement, duration) {
    const animation = this.animationCtrl.create()
      .addElement(nativElement)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '0', '1');;
    animation.play();
  }

}
