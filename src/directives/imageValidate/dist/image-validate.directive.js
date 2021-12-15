"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageValidateDirective = void 0;
var core_1 = require("@angular/core");
var ImageValidateDirective = /** @class */ (function () {
    function ImageValidateDirective(el) {
        this.el = el;
        this.appImageValidate = 50;
        this.orginalImage = "";
    }
    //=================================== for defalut img tag ==========================================
    ImageValidateDirective.prototype.error = function () {
        console.log("error", this.el.nativeElement.src);
        this.setDemoImage();
    };
    ImageValidateDirective.prototype.load = function () {
        console.log("load", this.el.nativeElement.src);
    };
    //=================================== for ion-img tag ==========================================
    ImageValidateDirective.prototype.ionError = function () {
        console.error("--------------- ionError", this.el.nativeElement.src);
        this.setDemoImage();
        this.removeLoader();
    };
    ImageValidateDirective.prototype.ionImgWillLoad = function () {
        this.addLoader();
    };
    ImageValidateDirective.prototype.ionImgDidLoad = function () {
        this.removeLoader();
    };
    ImageValidateDirective.prototype.setDemoImage = function () {
        this.el.nativeElement.src = "assets/0.png";
        this.el.nativeElement.style.minHeight = this.appImageValidate + 'px';
        this.el.nativeElement.style.height = this.appImageValidate + 'px';
        this.el.nativeElement.style.width = this.appImageValidate + 'px';
    };
    ImageValidateDirective.prototype.addLoader = function () {
        var loaderWidth = 28;
        if (loaderWidth > this.appImageValidate)
            loaderWidth = this.appImageValidate;
        var spinnerHtml = '<div class="center"><ion-spinner style="width:' + loaderWidth + 'px;" name="crescent"></ion-spinner></div>';
        var html = '<div style="min-height:' + this.appImageValidate + 'px;width:100%;position: relative;">' + spinnerHtml + '</div>';
        this.el.nativeElement.style.display = "none";
        this.el.nativeElement.insertAdjacentHTML('afterend', html);
        this.orginalImage = this.el.nativeElement.src;
    };
    ImageValidateDirective.prototype.removeLoader = function () {
        this.el.nativeElement.style.display = "unset";
        // this.el.nativeElement.removeChild()
        var image = this.el.nativeElement;
        var parent = image.parentNode;
        var sibling = image.nextSibling;
        parent.removeChild(sibling);
        //parent.insertBefore(textNode, sibling);
        //this.el.nativeElement.src = this.orginalImage
    };
    __decorate([
        core_1.Input()
    ], ImageValidateDirective.prototype, "appImageValidate");
    __decorate([
        core_1.HostListener('error')
    ], ImageValidateDirective.prototype, "error");
    __decorate([
        core_1.HostListener('load')
    ], ImageValidateDirective.prototype, "load");
    __decorate([
        core_1.HostListener('ionError')
    ], ImageValidateDirective.prototype, "ionError");
    __decorate([
        core_1.HostListener('ionImgWillLoad')
    ], ImageValidateDirective.prototype, "ionImgWillLoad");
    __decorate([
        core_1.HostListener('ionImgDidLoad')
    ], ImageValidateDirective.prototype, "ionImgDidLoad");
    ImageValidateDirective = __decorate([
        core_1.Directive({
            selector: '[appImageValidate]'
        })
    ], ImageValidateDirective);
    return ImageValidateDirective;
}());
exports.ImageValidateDirective = ImageValidateDirective;
