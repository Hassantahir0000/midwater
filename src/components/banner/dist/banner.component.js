"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BannerComponent = void 0;
var core_1 = require("@angular/core");
var BannerComponent = /** @class */ (function () {
    function BannerComponent(shared, navCtrl, config, loading, appHttpService, appUserService, appLogService) {
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.config = config;
        this.loading = loading;
        this.appHttpService = appHttpService;
        this.appUserService = appUserService;
        this.appLogService = appLogService;
        this.slideOpts = {
            autoplay: {
                delay: 2500
            }
        };
    }
    BannerComponent.prototype.failedImageLoad = function ($event) {
        console.log($event);
    };
    //===============================================================================================
    //on click image banners
    BannerComponent.prototype.bannerClick = function (image) {
        // if (image.banner_navigation.name == 'Category') {
        //   this.navCtrl.navigateForward("/products/" + image.banner_ref_id);
        // }
        // else if (image.banner_navigation.name == 'Product') {
        //   this.navCtrl.navigateForward("/product-detail/" + image.banner_ref_id)
        // }
        // else {
        this.navCtrl.navigateForward("/products");
        // }
    };
    BannerComponent.prototype.applyFlipEffect = function () {
        this.slideOpts = {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "flip");
                    swiper.classNames.push(swiper.params.containerModifierClass + "3d");
                    var overwriteParams = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: true,
                        spaceBetween: 0,
                        virtualTranslate: true
                    };
                    swiper.params = Object.assign(swiper.params, overwriteParams);
                    swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
                },
                setTranslate: function () {
                    var swiper = this;
                    var $ = swiper.$, slides = swiper.slides, rtl = swiper.rtlTranslate;
                    for (var i = 0; i < slides.length; i += 1) {
                        var $slideEl = slides.eq(i);
                        var progress = $slideEl[0].progress;
                        if (swiper.params.flipEffect.limitRotation) {
                            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                        }
                        var offset$$1 = $slideEl[0].swiperSlideOffset;
                        var rotate = -180 * progress;
                        var rotateY = rotate;
                        var rotateX = 0;
                        var tx = -offset$$1;
                        var ty = 0;
                        if (!swiper.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (rtl) {
                            rotateY = -rotateY;
                        }
                        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
                        if (swiper.params.flipEffect.slideShadows) {
                            // Set shadows
                            var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                            var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = swiper.$("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
                                $slideEl.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = swiper.$("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
                                $slideEl.append(shadowAfter);
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                        $slideEl
                            .transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
                    }
                },
                setTransition: function (duration) {
                    var swiper = this;
                    var slides = swiper.slides, activeIndex = swiper.activeIndex, $wrapperEl = swiper.$wrapperEl;
                    slides
                        .transition(duration)
                        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                        .transition(duration);
                    if (swiper.params.virtualTranslate && duration !== 0) {
                        var eventTriggered_1 = false;
                        // eslint-disable-next-line
                        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
                            if (eventTriggered_1)
                                return;
                            if (!swiper || swiper.destroyed)
                                return;
                            eventTriggered_1 = true;
                            swiper.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                            for (var i = 0; i < triggerEvents.length; i += 1) {
                                $wrapperEl.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            }
        };
    };
    BannerComponent.prototype.applyCubeEffect = function () {
        this.slideOpts = {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "cube");
                    swiper.classNames.push(swiper.params.containerModifierClass + "3d");
                    var overwriteParams = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: true,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: false,
                        virtualTranslate: true
                    };
                    this.params = Object.assign(this.params, overwriteParams);
                    this.originalParams = Object.assign(this.originalParams, overwriteParams);
                },
                setTranslate: function () {
                    var swiper = this;
                    var $el = swiper.$el, $wrapperEl = swiper.$wrapperEl, slides = swiper.slides, swiperWidth = swiper.width, swiperHeight = swiper.height, rtl = swiper.rtlTranslate, swiperSize = swiper.size;
                    var params = swiper.params.cubeEffect;
                    var isHorizontal = swiper.isHorizontal();
                    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    var wrapperRotate = 0;
                    var $cubeShadowEl;
                    if (params.shadow) {
                        if (isHorizontal) {
                            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
                            if ($cubeShadowEl.length === 0) {
                                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                                $wrapperEl.append($cubeShadowEl);
                            }
                            $cubeShadowEl.css({ height: swiperWidth + "px" });
                        }
                        else {
                            $cubeShadowEl = $el.find('.swiper-cube-shadow');
                            if ($cubeShadowEl.length === 0) {
                                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                                $el.append($cubeShadowEl);
                            }
                        }
                    }
                    for (var i = 0; i < slides.length; i += 1) {
                        var $slideEl = slides.eq(i);
                        var slideIndex = i;
                        if (isVirtual) {
                            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
                        }
                        var slideAngle = slideIndex * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                        var tx = 0;
                        var ty = 0;
                        var tz = 0;
                        if (slideIndex % 4 === 0) {
                            tx = -round * 4 * swiperSize;
                            tz = 0;
                        }
                        else if ((slideIndex - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * swiperSize;
                        }
                        else if ((slideIndex - 2) % 4 === 0) {
                            tx = swiperSize + (round * 4 * swiperSize);
                            tz = swiperSize;
                        }
                        else if ((slideIndex - 3) % 4 === 0) {
                            tx = -swiperSize;
                            tz = (3 * swiperSize) + (swiperSize * 4 * round);
                        }
                        if (rtl) {
                            tx = -tx;
                        }
                        if (!isHorizontal) {
                            ty = tx;
                            tx = 0;
                        }
                        var transform$$1 = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = (slideIndex * 90) + (progress * 90);
                            if (rtl)
                                wrapperRotate = (-slideIndex * 90) - (progress * 90);
                        }
                        $slideEl.transform(transform$$1);
                        if (params.slideShadows) {
                            // Set shadows
                            var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                            var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = swiper.$("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
                                $slideEl.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = swiper.$("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
                                $slideEl.append(shadowAfter);
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    $wrapperEl.css({
                        '-webkit-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
                        '-moz-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
                        '-ms-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
                        'transform-origin': "50% 50% -" + swiperSize / 2 + "px"
                    });
                    if (params.shadow) {
                        if (isHorizontal) {
                            $cubeShadowEl.transform("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + -swiperWidth / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + params.shadowScale + ")");
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
                            var multiplier = 1.5 - ((Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                                + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2));
                            var scale1 = params.shadowScale;
                            var scale2 = params.shadowScale / multiplier;
                            var offset$$1 = params.shadowOffset;
                            $cubeShadowEl.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset$$1) + "px, " + -swiperHeight / 2 / scale2 + "px) rotateX(-90deg)");
                        }
                    }
                    var zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
                    $wrapperEl
                        .transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)");
                },
                setTransition: function (duration) {
                    var swiper = this;
                    var $el = swiper.$el, slides = swiper.slides;
                    slides
                        .transition(duration)
                        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                        .transition(duration);
                    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
                        $el.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            }
        };
    };
    BannerComponent.prototype.applyCoverFlowEffect = function () {
        this.slideOpts = {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            slidesPerView: 1,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "coverflow");
                    swiper.classNames.push(swiper.params.containerModifierClass + "3d");
                    swiper.params.watchSlidesProgress = true;
                    swiper.originalParams.watchSlidesProgress = true;
                },
                setTranslate: function () {
                    var swiper = this;
                    var swiperWidth = swiper.width, swiperHeight = swiper.height, slides = swiper.slides, $wrapperEl = swiper.$wrapperEl, slidesSizesGrid = swiper.slidesSizesGrid, $ = swiper.$;
                    var params = swiper.params.coverflowEffect;
                    var isHorizontal = swiper.isHorizontal();
                    var transform$$1 = swiper.translate;
                    var center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
                    var rotate = isHorizontal ? params.rotate : -params.rotate;
                    var translate = params.depth;
                    // Each slide offset from center
                    for (var i = 0, length = slides.length; i < length; i += 1) {
                        var $slideEl = slides.eq(i);
                        var slideSize = slidesSizesGrid[i];
                        var slideOffset = $slideEl[0].swiperSlideOffset;
                        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
                        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
                        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
                        var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
                        var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
                        // Fix for ultra small values
                        if (Math.abs(translateX) < 0.001)
                            translateX = 0;
                        if (Math.abs(translateY) < 0.001)
                            translateY = 0;
                        if (Math.abs(translateZ) < 0.001)
                            translateZ = 0;
                        if (Math.abs(rotateY) < 0.001)
                            rotateY = 0;
                        if (Math.abs(rotateX) < 0.001)
                            rotateX = 0;
                        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
                        $slideEl.transform(slideTransform);
                        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (params.slideShadows) {
                            // Set shadows
                            var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                            var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                            if ($shadowBeforeEl.length === 0) {
                                $shadowBeforeEl = swiper.$("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
                                $slideEl.append($shadowBeforeEl);
                            }
                            if ($shadowAfterEl.length === 0) {
                                $shadowAfterEl = swiper.$("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
                                $slideEl.append($shadowAfterEl);
                            }
                            if ($shadowBeforeEl.length)
                                $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if ($shadowAfterEl.length)
                                $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
                    // Set correct perspective for IE10
                    if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
                        var ws = $wrapperEl[0].style;
                        ws.perspectiveOrigin = center + "px 50%";
                    }
                },
                setTransition: function (duration) {
                    var swiper = this;
                    swiper.slides
                        .transition(duration)
                        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                        .transition(duration);
                }
            }
        };
    };
    BannerComponent.prototype.applyFadeEffect = function () {
        this.slideOpts = {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "fade");
                    var overwriteParams = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: true,
                        spaceBetween: 0,
                        virtualTranslate: true
                    };
                    swiper.params = Object.assign(swiper.params, overwriteParams);
                    swiper.params = Object.assign(swiper.originalParams, overwriteParams);
                },
                setTranslate: function () {
                    var swiper = this;
                    var slides = swiper.slides;
                    for (var i = 0; i < slides.length; i += 1) {
                        var $slideEl = swiper.slides.eq(i);
                        var offset$$1 = $slideEl[0].swiperSlideOffset;
                        var tx = -offset$$1;
                        if (!swiper.params.virtualTranslate)
                            tx -= swiper.translate;
                        var ty = 0;
                        if (!swiper.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = swiper.params.fadeEffect.crossFade
                            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
                            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                        $slideEl
                            .css({
                            opacity: slideOpacity
                        })
                            .transform("translate3d(" + tx + "px, " + ty + "px, 0px)");
                    }
                },
                setTransition: function (duration) {
                    var swiper = this;
                    var slides = swiper.slides, $wrapperEl = swiper.$wrapperEl;
                    slides.transition(duration);
                    if (swiper.params.virtualTranslate && duration !== 0) {
                        var eventTriggered_2 = false;
                        slides.transitionEnd(function () {
                            if (eventTriggered_2)
                                return;
                            if (!swiper || swiper.destroyed)
                                return;
                            eventTriggered_2 = true;
                            swiper.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                            for (var i = 0; i < triggerEvents.length; i += 1) {
                                $wrapperEl.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            }
        };
    };
    BannerComponent.prototype.ngOnInit = function () {
    };
    BannerComponent.prototype.ngDoCheck = function () {
        // if (this.config.bannerAnimationEffect == 'fade') this.applyFadeEffect();
        // else if (this.config.bannerAnimationEffect == 'cube') this.applyCubeEffect();
        // else if (this.config.bannerAnimationEffect == 'flip') this.applyFlipEffect();
        // else if (this.config.bannerAnimationEffect == 'coverFlow') this.applyCoverFlowEffect();
        // if (this.config.bannerStyle == "bottomBulletsWhiteBackground") {
        //   this.slideOpts.pagination = {
        //     el: '.swiper-pagination',
        //     dynamicBullets: true,
        //   }
        // }
        // if (this.config.bannerStyle == "progressBar") {
        //   this.slideOpts.pagination = {
        //     el: '.swiper-pagination',
        //     type: 'progressbar',
        //     progressbarOpposite: false
        //   }
        // }
        // if (this.config.bannerStyle == "numberBullets") {
        //   this.slideOpts.pagination = {
        //     el: '.swiper-pagination',
        //     renderBullet: function (index, className) {
        //       return '<span class="' + className + '">' + (index + 1) + '</span>';
        //     }
        //   }
        // }
    };
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.scss']
        })
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
