"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePageStyle7Module = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var pipes_module_1 = require("src/pipes/pipes.module");
var forms_1 = require("@angular/forms");
var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");
var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");
var home_page_style7_component_1 = require("./home-page-style7.component");
var banner_module_1 = require("src/components/banner/banner.module");
var categories_page_style5_module_1 = require("src/components/categories-page-styles/categories-page-style5/categories-page-style5.module");
var home_products_list_module_1 = require("src/components/home-products-list/home-products-list.module");
var product_slider_module_1 = require("src/components/products-slider/product-slider.module");
var HomePageStyle7Module = /** @class */ (function () {
    function HomePageStyle7Module() {
    }
    HomePageStyle7Module = __decorate([
        core_1.NgModule({
            declarations: [
                home_page_style7_component_1.HomePageStyle7Component
            ],
            exports: [
                home_page_style7_component_1.HomePageStyle7Component
            ],
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule,
                pipes_module_1.PipesModule,
                forms_1.FormsModule,
                animationDirective_module_1.AnimationDirectiveModule,
                imageValidate_module_1.ImageValidateDirectiveModule,
                product_slider_module_1.productSliderModule,
                home_products_list_module_1.homeProductsListModule,
                banner_module_1.bannerModule,
                categories_page_style5_module_1.categoryPageStyle5Module,
            ]
        })
    ], HomePageStyle7Module);
    return HomePageStyle7Module;
}());
exports.HomePageStyle7Module = HomePageStyle7Module;
