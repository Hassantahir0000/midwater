"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.productListCardModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var pipes_module_1 = require("src/pipes/pipes.module");
var product_list_card_component_1 = require("./product-list-card.component");
var imageValidate_module_1 = require("src/directives/imageValidate/imageValidate.module");
var productListCardModule = /** @class */ (function () {
    function productListCardModule() {
    }
    productListCardModule = __decorate([
        core_1.NgModule({
            declarations: [
                product_list_card_component_1.ProductListCardComponent
            ],
            exports: [
                product_list_card_component_1.ProductListCardComponent
            ],
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule,
                pipes_module_1.PipesModule,
                imageValidate_module_1.ImageValidateDirectiveModule
            ]
        })
    ], productListCardModule);
    return productListCardModule;
}());
exports.productListCardModule = productListCardModule;
