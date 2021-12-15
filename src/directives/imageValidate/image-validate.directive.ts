import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageValidate]'
})
export class ImageValidateDirective {

  @Input() appImageValidate = 50;
  constructor(public el: ElementRef) {

  }

  //=================================== for defalut img tag ==========================================
  @HostListener('error') error() {
    console.log("error", this.el.nativeElement.src)
    this.setDemoImage()
  }

  @HostListener('load') load() {
    console.log("load", this.el.nativeElement.src)
  }
  //=================================== for ion-img tag ==========================================
  @HostListener('ionError') ionError() {
    console.error("--------------- ionError", this.el.nativeElement.src)
    this.setDemoImage()
    this.removeLoader()
  }
  public orginalImage = ""
  @HostListener('ionImgWillLoad') ionImgWillLoad() {
    this.addLoader()
  }
  @HostListener('ionImgDidLoad') ionImgDidLoad() {
    this.removeLoader()
  }
  setDemoImage() {
    this.el.nativeElement.src = "assets/0.png"
    this.el.nativeElement.style.minHeight = this.appImageValidate + 'px'
    this.el.nativeElement.style.height = this.appImageValidate + 'px'
    this.el.nativeElement.style.width = this.appImageValidate + 'px'
  }
  addLoader() {
    let loaderWidth = 28
    if (loaderWidth > this.appImageValidate) loaderWidth = this.appImageValidate
    let spinnerHtml = '<div class="center"><ion-spinner style="width:' + loaderWidth + 'px;" name="crescent"></ion-spinner></div>'
    let html = '<div style="min-height:' + this.appImageValidate + 'px;width:100%;position: relative;">' + spinnerHtml + '</div>'
    this.el.nativeElement.style.display = "none"
    this.el.nativeElement.insertAdjacentHTML('afterend', html);
    this.orginalImage = this.el.nativeElement.src
  }
  removeLoader() {
    this.el.nativeElement.style.display = "unset"
    // this.el.nativeElement.removeChild()

    var image = this.el.nativeElement;
    var parent = image.parentNode;
    var sibling = image.nextSibling;

    parent.removeChild(sibling);
    //parent.insertBefore(textNode, sibling);
    //this.el.nativeElement.src = this.orginalImage
  }

}
