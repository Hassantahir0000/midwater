"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppAnimationsService = void 0;
var core_1 = require("@angular/core");
var AppAnimationsService = /** @class */ (function () {
    function AppAnimationsService(animationCtrl) {
        this.animationCtrl = animationCtrl;
    }
    AppAnimationsService.prototype.fadeAnimation = function (nativElement, duration) {
        var animation = this.animationCtrl.create()
            .addElement(nativElement)
            .duration(duration)
            .iterations(1)
            .fromTo('opacity', '0', '1');
        ;
        animation.play();
    };
    AppAnimationsService.prototype.fadeLeaveAnimation = function (nativElement, duration) {
        var animation = this.animationCtrl.create()
            .addElement(nativElement)
            .duration(duration)
            .iterations(1)
            .fromTo('opacity', '1', '0');
        ;
        animation.play();
    };
    AppAnimationsService.prototype.fadeAnimationWithClassName = function (className, duration) {
        var animation = this.animationCtrl.create()
            .addElement(document.querySelector('.' + className))
            .duration(duration)
            .iterations(1)
            .fromTo('opacity', '0', '1');
        ;
        animation.play();
    };
    AppAnimationsService.prototype.slideInAnimation = function (nativElement, duration) {
        var animation = this.animationCtrl.create()
            .addElement(nativElement)
            .duration(duration)
            .iterations(1)
            .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
            .fromTo('opacity', '0', '1');
        ;
        animation.play();
    };
    AppAnimationsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppAnimationsService);
    return AppAnimationsService;
}());
exports.AppAnimationsService = AppAnimationsService;
