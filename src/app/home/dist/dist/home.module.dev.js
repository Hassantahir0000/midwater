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
exports.HomePageModule = void 0;

var core_1 = require("@angular/core");

var common_1 = require("@angular/common");

var forms_1 = require("@angular/forms");

var router_1 = require("@angular/router");

var angular_1 = require("@ionic/angular");

var home_page_1 = require("./home.page");

var pipes_module_1 = require("src/pipes/pipes.module");

var home_page_style1_component_1 = require("src/components/home-page-styles/home-page-style1/home-page-style1.component");

var home_page_style3_component_1 = require("src/components/home-page-styles/home-page-style3/home-page-style3.component");

var home_page_style4_component_1 = require("src/components/home-page-styles/home-page-style4/home-page-style4.component");

var home_page_style5_component_1 = require("src/components/home-page-styles/home-page-style5/home-page-style5.component");

var home_page_style6_component_1 = require("src/components/home-page-styles/home-page-style6/home-page-style6.component");

var home_page_style7_component_1 = require("src/components/home-page-styles/home-page-style7/home-page-style7.component");

var home_page_style8_component_1 = require("src/components/home-page-styles/home-page-style8/home-page-style8.component");

var home_page_style9_component_1 = require("src/components/home-page-styles/home-page-style9/home-page-style9.component");

var home_page_style10_component_1 = require("src/components/home-page-styles/home-page-style10/home-page-style10.component");

var home_page_style2_component_1 = require("src/components/home-page-styles/home-page-style2/home-page-style2.component");

var product_card_module_1 = require("src/components/product-card/product-card.module");

var banner_module_1 = require("src/components/banner/banner.module");

var home_products_list_module_1 = require("src/components/home-products-list/home-products-list.module");

var product_slider_module_1 = require("src/components/products-slider/product-slider.module");

var home_segments_module_1 = require("src/components/home-segments/home-segments.module");

var categories_page_style1_module_1 = require("src/components/categories-page-styles/categories-page-style1/categories-page-style1.module");

var categories_page_style5_module_1 = require("src/components/categories-page-styles/categories-page-style5/categories-page-style5.module");

var categories_page_style3_module_1 = require("src/components/categories-page-styles/categories-page-style3/categories-page-style3.module");

var no_record_found_module_1 = require("src/components/no-record-found/no-record-found.module");

var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");

var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");

var routes = [{
  path: '',
  component: home_page_1.HomePage
}];

var HomePageModule =
/** @class */
function () {
  function HomePageModule() {}

  HomePageModule = __decorate([core_1.NgModule({
    imports: [common_1.CommonModule, forms_1.FormsModule, angular_1.IonicModule, router_1.RouterModule.forChild(routes), product_card_module_1.productCardModule, banner_module_1.bannerModule, pipes_module_1.PipesModule, home_products_list_module_1.homeProductsListModule, product_slider_module_1.productSliderModule, home_segments_module_1.homeSegmentsModule, categories_page_style1_module_1.categoryPageStyle1Module, categories_page_style5_module_1.categoryPageStyle5Module, categories_page_style3_module_1.categoryPageStyle3Module, no_record_found_module_1.NoRecordFoundModule, animationDirective_module_1.AnimationDirectiveModule, imageValidate_module_1.ImageValidateDirectiveModule],
    declarations: [home_page_1.HomePage, home_page_style1_component_1.HomePageStyle1Component, home_page_style2_component_1.HomePageStyle2Component, home_page_style3_component_1.HomePageStyle3Component, home_page_style4_component_1.HomePageStyle4Component, home_page_style5_component_1.HomePageStyle5Component, home_page_style6_component_1.HomePageStyle6Component, home_page_style7_component_1.HomePageStyle7Component, home_page_style8_component_1.HomePageStyle8Component, home_page_style9_component_1.HomePageStyle9Component, home_page_style10_component_1.HomePageStyle10Component]
  })], HomePageModule);
  return HomePageModule;
}();

exports.HomePageModule = HomePageModule;