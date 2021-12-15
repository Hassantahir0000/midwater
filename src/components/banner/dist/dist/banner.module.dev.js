"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.bannerModule = void 0;

var common_1 = require("@angular/common");

var core_1 = require("@angular/core");

var angular_1 = require("@ionic/angular");

var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");

var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module"); //for home banner


var banner_component_1 = require("../banner/banner.component");

var bannerModule =
/** @class */
function () {
  function bannerModule() {}

  bannerModule = __decorate([core_1.NgModule({
    declarations: [banner_component_1.BannerComponent],
    exports: [banner_component_1.BannerComponent],
    imports: [angular_1.IonicModule, common_1.CommonModule, animationDirective_module_1.AnimationDirectiveModule, imageValidate_module_1.ImageValidateDirectiveModule]
  })], bannerModule);
  return bannerModule;
}();

exports.bannerModule = bannerModule;