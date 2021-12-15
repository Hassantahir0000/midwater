import { Directive, ElementRef, Input } from '@angular/core';
import { AppAnimationsService } from 'src/services/app-animations/app-animations.service';
import { ConfigService } from 'src/services/config/config.service';

@Directive({
  selector: '[appAnimation]'
})
export class AnimationDirective {

  @Input() appAnimation = '';

  constructor(
    public el: ElementRef,
    public appAnimationsService: AppAnimationsService,
    public config: ConfigService
  ) {
  }
  ngAfterViewInit() {
    if (this.appAnimation == "fade") {
      this.appAnimationsService.fadeAnimation(this.el.nativeElement, this.config.animationDurationNumber)
    }
  }
  ngOnDestroy() {
    if (this.appAnimation == "fade") {
      this.appAnimationsService.slideInAnimation(this.el.nativeElement, this.config.animationDurationNumber)
    }
  }

}
