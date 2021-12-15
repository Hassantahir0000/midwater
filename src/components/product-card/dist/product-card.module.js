"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.productCardModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var product_card_component_1 = require("./product-card.component");
var product_card_style1_component_1 = require("../product-card-styles/product-card-style1/product-card-style1.component");
var pipes_module_1 = require("src/pipes/pipes.module");
var product_card_style2_component_1 = require("../product-card-styles/product-card-style2/product-card-style2/product-card-style2.component");
var product_card_style3_component_1 = require("../product-card-styles/product-card-style3/product-card-style3.component");
var product_card_style4_component_1 = require("../product-card-styles/product-card-style4/product-card-style4.component");
var product_card_style5_component_1 = require("../product-card-styles/product-card-style5/product-card-style5.component");
var product_card_style6_component_1 = require("../product-card-styles/product-card-style6/product-card-style6.component");
var product_card_style10_component_1 = require("../product-card-styles/product-card-style10/product-card-style10.component");
var product_card_style11_component_1 = require("../product-card-styles/product-card-style11/product-card-style11.component");
var product_card_style12_component_1 = require("../product-card-styles/product-card-style12/product-card-style12.component");
var product_card_style13_component_1 = require("../product-card-styles/product-card-style13/product-card-style13.component");
var product_card_style14_component_1 = require("../product-card-styles/product-card-style14/product-card-style14.component");
var product_card_style15_component_1 = require("../product-card-styles/product-card-style15/product-card-style15.component");
var product_card_style16_component_1 = require("../product-card-styles/product-card-style16/product-card-style16.component");
var product_card_style17_component_1 = require("../product-card-styles/product-card-style17/product-card-style17.component");
var product_card_style18_component_1 = require("../product-card-styles/product-card-style18/product-card-style18.component");
var product_card_style19_component_1 = require("../product-card-styles/product-card-style19/product-card-style19.component");
var product_card_style20_component_1 = require("../product-card-styles/product-card-style20/product-card-style20.component");
var product_card_style21_component_1 = require("../product-card-styles/product-card-style21/product-card-style21.component");
var product_card_style22_component_1 = require("../product-card-styles/product-card-style22/product-card-style22.component");
var product_card_style23_component_1 = require("../product-card-styles/product-card-style23/product-card-style23.component");
var product_card_style7_component_1 = require("../product-card-styles/product-card-style7/product-card-style7.component");
var product_card_style8_component_1 = require("../product-card-styles/product-card-style8/product-card-style8.component");
var product_card_style9_component_1 = require("../product-card-styles/product-card-style9/product-card-style9.component");
var product_card_style24_component_1 = require("../product-card-styles/product-card-style24/product-card-style24.component");
var product_card_style25_component_1 = require("../product-card-styles/product-card-style25/product-card-style25.component");
var product_card_style26_component_1 = require("../product-card-styles/product-card-style26/product-card-style26.component");
var product_card_style27_component_1 = require("../product-card-styles/product-card-style27/product-card-style27.component");
var product_card_style28_component_1 = require("../product-card-styles/product-card-style28/product-card-style28.component");
var animationDirective_module_1 = require("src/directives/appAnimation/animationDirective.module");
var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");
var productCardModule = /** @class */ (function () {
    function productCardModule() {
    }
    productCardModule = __decorate([
        core_1.NgModule({
            declarations: [
                product_card_component_1.ProductCardComponent,
                product_card_style1_component_1.ProductCardStyle1Component,
                product_card_style2_component_1.ProductCardStyle2Component,
                product_card_style3_component_1.ProductCardStyle3Component,
                product_card_style4_component_1.ProductCardStyle4Component,
                product_card_style5_component_1.ProductCardStyle5Component,
                product_card_style6_component_1.ProductCardStyle6Component,
                product_card_style7_component_1.ProductCardStyle7Component,
                product_card_style8_component_1.ProductCardStyle8Component,
                product_card_style9_component_1.ProductCardStyle9Component,
                product_card_style10_component_1.ProductCardStyle10Component,
                product_card_style11_component_1.ProductCardStyle11Component,
                product_card_style12_component_1.ProductCardStyle12Component,
                product_card_style13_component_1.ProductCardStyle13Component,
                product_card_style14_component_1.ProductCardStyle14Component,
                product_card_style15_component_1.ProductCardStyle15Component,
                product_card_style16_component_1.ProductCardStyle16Component,
                product_card_style17_component_1.ProductCardStyle17Component,
                product_card_style18_component_1.ProductCardStyle18Component,
                product_card_style19_component_1.ProductCardStyle19Component,
                product_card_style20_component_1.ProductCardStyle20Component,
                product_card_style21_component_1.ProductCardStyle21Component,
                product_card_style22_component_1.ProductCardStyle22Component,
                product_card_style23_component_1.ProductCardStyle23Component,
                product_card_style24_component_1.ProductCardStyle24Component,
                product_card_style25_component_1.ProductCardStyle25Component,
                product_card_style26_component_1.ProductCardStyle26Component,
                product_card_style27_component_1.ProductCardStyle27Component,
                product_card_style28_component_1.ProductCardStyle28Component,
            ],
            exports: [
                product_card_component_1.ProductCardComponent
            ],
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule,
                pipes_module_1.PipesModule,
                animationDirective_module_1.AnimationDirectiveModule,
                imageValidate_module_1.ImageValidateDirectiveModule
            ]
        })
    ], productCardModule);
    return productCardModule;
}());
exports.productCardModule = productCardModule;
