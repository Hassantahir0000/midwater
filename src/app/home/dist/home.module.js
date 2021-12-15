"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
var home_page_style1_module_1 = require("src/components/home-page-styles/home-page-style1/home-page-style1.module");
var home_page_style10_module_1 = require("src/components/home-page-styles/home-page-style10/home-page-style10.module");
var home_page_style2_module_1 = require("src/components/home-page-styles/home-page-style2/home-page-style2.module");
var home_page_style3_module_1 = require("src/components/home-page-styles/home-page-style3/home-page-style3.module");
var home_page_style4_module_1 = require("src/components/home-page-styles/home-page-style4/home-page-style4.module");
var home_page_style6_module_1 = require("src/components/home-page-styles/home-page-style6/home-page-style6.module");
var home_page_style7_module_1 = require("src/components/home-page-styles/home-page-style7/home-page-style7.module");
var home_page_style9_module_1 = require("src/components/home-page-styles/home-page-style9/home-page-style9.module");
var home_page_style5_module_1 = require("src/components/home-page-styles/home-page-style5/home-page-style5.module");
var home_page_style8_module_1 = require("src/components/home-page-styles/home-page-style8/home-page-style8.module");
var routes = [
    {
        path: '',
        component: home_page_1.HomePage
    }
];
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                router_1.RouterModule.forChild(routes),
                home_page_style1_module_1.HomePageStyle1Module,
                home_page_style2_module_1.HomePageStyle2Module,
                home_page_style3_module_1.HomePageStyle3Module,
                home_page_style4_module_1.HomePageStyle4Module,
                home_page_style5_module_1.HomePageStyle5Module,
                home_page_style6_module_1.HomePageStyle6Module,
                home_page_style7_module_1.HomePageStyle7Module,
                home_page_style8_module_1.HomePageStyle8Module,
                home_page_style9_module_1.HomePageStyle9Module,
                home_page_style10_module_1.HomePageStyle10Module
            ],
            declarations: [
                home_page_1.HomePage
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());
exports.HomePageModule = HomePageModule;
