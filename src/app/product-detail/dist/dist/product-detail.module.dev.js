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
exports.ProductDetailPageModule = void 0;

var core_1 = require("@angular/core");

var common_1 = require("@angular/common");

var forms_1 = require("@angular/forms");

var router_1 = require("@angular/router");

var angular_1 = require("@ionic/angular");

var product_detail_page_1 = require("./product-detail.page");

var pipes_module_1 = require("src/pipes/pipes.module");

var product_card_module_1 = require("src/components/product-card/product-card.module");

var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");

var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");

var routes = [{
  path: '',
  component: product_detail_page_1.ProductDetailPage
}];

var ProductDetailPageModule =
/** @class */
function () {
  function ProductDetailPageModule() {}

  ProductDetailPageModule = __decorate([core_1.NgModule({
    imports: [common_1.CommonModule, forms_1.FormsModule, angular_1.IonicModule, router_1.RouterModule.forChild(routes), pipes_module_1.PipesModule, product_card_module_1.productCardModule, animationDirective_module_1.AnimationDirectiveModule, imageValidate_module_1.ImageValidateDirectiveModule],
    declarations: [product_detail_page_1.ProductDetailPage]
  })], ProductDetailPageModule);
  return ProductDetailPageModule;
}();

exports.ProductDetailPageModule = ProductDetailPageModule;